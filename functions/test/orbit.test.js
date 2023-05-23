const axios = require('axios');
require('dotenv').config();

const { insertMember } = require('../orbit');

jest.mock('axios');

describe('insertMember', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should insert a member successfully', async () => {
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
    axios.post.mockRejectedValueOnce(new Error('Failed to insert member'));

    const member = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      bio: 'Lorem ipsum dolor sit amet',
    };

    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

    const result = await insertMember(member);

    expect(result).toBe(false);
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Error inserting member: ',
      expect.any(Error)
    );
  });
});
