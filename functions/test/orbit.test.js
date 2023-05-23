const axios = require('axios');
require('dotenv').config();

const { insertMember } = require('../orbit');

// Mock the axios library
jest.mock('axios');

describe('insertMember', () => {
  // Restore the original implementation after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should insert a member successfully', async () => {
    // Mock successful API response
    axios.post.mockResolvedValueOnce({});

    const member = {
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Lorem ipsum dolor sit amet',
    };

    const result = await insertMember(member);

    expect(result).toBe(true);
    expect(axios.post).toHaveBeenCalledWith(
      `https://app.orbit.love/api/v1/${process.env.ORBIT_WORKSPACE_ID}/members`,
      {
        member: {
          name: 'John Doe',
          email: 'john@example.com',
          bio: 'Lorem ipsum dolor sit amet',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ORBIT_API_KEY}`,
        },
      }
    );
  });

  it('should return false and log an error if insertion fails', async () => {
    // Mock error response
    axios.post.mockRejectedValueOnce(new Error('Failed to insert member'));

    const member = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      bio: 'Lorem ipsum dolor sit amet',
    };

    process.env.ORBIT_WORKSPACE_ID = 'your-workspace-id';
    process.env.ORBIT_API_KEY = 'your-api-key';

    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

    const result = await insertMember(member);

    expect(result).toBe(false);
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Error inserting member: ',
      expect.any(Error)
    );
  });
});
