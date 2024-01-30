const axios = require('axios');
require('dotenv').config();

const {
  insertMember,
  findMemberByEmail,
  updateMemberIdentity
} = require('../orbit');

jest.mock('axios');

describe('insertMember', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should insert a member successfully', async () => {
    axios.post.mockResolvedValueOnce({});

    const member = {
      username: 'John Doe',
      email: 'john@example.com',
    };

    const result = await insertMember(member);

    expect(result).toBe(true);
    expect(axios.post).toHaveBeenCalledWith(
      `https://app.orbit.love/api/v1/${process.env.ORBIT_WORKSPACE_ID}/members`,
      {
        member: {
          name: 'John Doe',
          email: 'john@example.com',
        },
        identity: {
          name: 'Web3dev',
          source: 'web3devBuild',
          source_host: 'https://bootcamp.web3dev.com.br/',
          username: 'John Doe',
          uid: undefined,
          email: 'john@example.com',
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
      username: 'Jane Smith',
      email: 'jane@example.com',
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

describe('findMemberByEmail', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should find a member by email successfully', async () => {
    const email = 'john@example.com';
    const responseData = { data: 'member data' };
    axios.get.mockResolvedValueOnce({ data: responseData });

    const result = await findMemberByEmail(email);

    expect(result).toBe(responseData.data);
    expect(axios.get).toHaveBeenCalledWith(
      `https://app.orbit.love/api/v1/${process.env.ORBIT_WORKSPACE_ID}/members/find?source=email&email=${email}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.ORBIT_API_KEY}`,
        },
      }
    );
  });

  it('should return null and log an error if member lookup fails', async () => {
    const email = 'jane@example.com';
    axios.get.mockRejectedValueOnce(new Error('Failed to find member'));

    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

    const result = await findMemberByEmail(email);

    expect(result).toBe(null);
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Error finding member: ',
      expect.any(Error)
    );
  });
});

describe('updateMemberIdentity', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should update member identity successfully', async () => {
    const user = {
      username: 'John Doe',
      id: '123',
      email: 'john@example.com',
    };
    const memberSlug = 'member-slug';
    const responseData = { data: 'updated identity data' };
    axios.post.mockResolvedValueOnce({ data: responseData });
  
    const result = await updateMemberIdentity(user, memberSlug);
  
    expect(result).toBe(responseData.data);
    expect(axios.post).toHaveBeenCalledWith(
      `https://app.orbit.love/api/v1/${process.env.ORBIT_WORKSPACE_ID}/members/${memberSlug}/identities`,
      {
        name: 'Web3dev',
        source: 'web3devBuild',
        source_host: 'https://bootcamp.web3dev.com.br/',
        username: 'John Doe',
        uid: '123',
        email: 'john@example.com',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ORBIT_API_KEY}`,
        },
      }
    );
  });
  

  it('should return null and log an error if member identity update fails', async () => {
    const user = {
      username: 'Jane Smith',
      id: '456',
      email: 'jane@example.com',
    };
    const memberSlug = 'member-slug';
    axios.get.mockRejectedValueOnce(new Error('Failed to update member identity'));

    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

    const result = await updateMemberIdentity(user, memberSlug);

    expect(result).toBe(null);
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Error updating member identity: ',
      expect.any(Error)
    );
  });
});
