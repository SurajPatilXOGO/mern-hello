const request = require('supertest');
const app = require('../server'); // Express app
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// --- Mocks ---
// Mock implementation for a Message instance's save method
const mockSave = jest.fn();

// Mock the Message model
jest.mock('../models/message', () => {
  // This is the mock constructor for Message
  const MockedMessage = jest.fn().mockImplementation(function(args) {
    // Store the properties passed to constructor if any
    if (args && args.text) {
      this.text = args.text;
    }
    this.save = mockSave;
    // Return `this` to simulate constructor behavior
    return this;
  });
  // Attach static methods like findOne to the constructor
  MockedMessage.findOne = jest.fn();
  return MockedMessage; // Export the mock constructor
});

const Message = require('../models/message'); // Require the now-mocked model

jest.mock('mongoose'); // Keep mongoose connection mocked
jest.setTimeout(30000); // Increase timeout for async operations
// --- End Mocks ---

describe('API Tests', () => {
  beforeAll(async () => {
    mongoose.connect.mockResolvedValue(true); // Mock DB connection
  });

  afterAll(async () => {
    if (mongoose.connection && mongoose.connection.close) {
      mongoose.connection.close.mockResolvedValue(true);
    }
  });

  beforeEach(() => {
    // Reset all mocks before each test to ensure test independence
    Message.findOne.mockReset();
    mockSave.mockReset(); // Reset calls and implementations for save
    Message.mockClear(); // Clears call history and instances of the Message constructor
  });

  describe('GET /api/message', () => {
    it('should return a 200 status and an existing message', async () => {
      const existingMessageData = { text: 'Hello from the MERN stack!' };
      Message.findOne.mockResolvedValue(existingMessageData); // findOne returns plain data or a mock instance

      const response = await request(app).get('/api/message');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: existingMessageData.text });
      expect(Message.findOne).toHaveBeenCalledTimes(1);
      expect(Message).not.toHaveBeenCalled(); // Constructor should not be called
      expect(mockSave).not.toHaveBeenCalled();
    });

    it('should create and return a new message if none exists, status 200', async () => {
      Message.findOne.mockResolvedValue(null); // No message found
      const newMessageText = "Hello from MongoDB!"; // As defined in route
      
      // Configure mockSave for this specific test case to return the instance with text
      mockSave.mockImplementation(function() { 
        // `this` refers to the mock instance created by MockedMessage constructor
        // Ensure it has the text property set by the constructor for the response
        return Promise.resolve(this); 
      });

      const response = await request(app).get('/api/message');
      
      expect(response.status).toBe(200);
      expect(Message.findOne).toHaveBeenCalledTimes(1);
      expect(Message).toHaveBeenCalledTimes(1); // Constructor called once
      // Verify constructor was called with the correct text
      expect(Message).toHaveBeenCalledWith({ text: newMessageText }); 
      expect(mockSave).toHaveBeenCalledTimes(1); // save() called on the new instance
      expect(response.body).toEqual({ message: newMessageText });
    });

    it('should return a 500 status if findOne fails', async () => {
      Message.findOne.mockRejectedValue(new Error('Database findOne error'));

      const response = await request(app).get('/api/message');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
      expect(Message.findOne).toHaveBeenCalledTimes(1);
      expect(Message).not.toHaveBeenCalled();
      expect(mockSave).not.toHaveBeenCalled();
    });

    it('should return a 500 status if save fails', async () => {
      Message.findOne.mockResolvedValue(null); // No message found, attempt to create
      mockSave.mockRejectedValue(new Error('Database save error')); // Simulate save failure
      const newMessageText = "Hello from MongoDB!";

      const response = await request(app).get('/api/message');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
      expect(Message.findOne).toHaveBeenCalledTimes(1);
      expect(Message).toHaveBeenCalledTimes(1); // Constructor called once
      expect(Message).toHaveBeenCalledWith({ text: newMessageText });
      expect(mockSave).toHaveBeenCalledTimes(1); // save() called
    });
  });
});
