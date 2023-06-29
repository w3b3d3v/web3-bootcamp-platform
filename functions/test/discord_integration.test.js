const { addDiscordRole } = require('../discord_integration.js')
let record = require('./record.js')

const { REST } = require('@discordjs/rest');
jest.mock('@discordjs/rest', () => ({
  REST: jest.fn().mockImplementation(() => ({
    setToken: jest.fn().mockReturnValue({
      put: jest.fn().mockReturnValue({ status: 200 }),
    }),
  })),
}));

const { Routes } = require('discord-api-types/v10');
jest.mock('discord-api-types/v10', () => ({
  Routes: {
    guildMemberRole: jest.fn(),
  },
}));

describe('Discord Integration', function() {
  describe("calling function without user_id", function () {
    it("Should return empty response", async () => {
      let res = await addDiscordRole();
      expect(res).toEqual(undefined);
    });
  });
  
  describe('calling function with parameters correctly', () => {
    it('Should add role to user', async () => {
      let user_id = "123";
      let role = "1234"

      const res = await addDiscordRole(user_id, role);
      
      expect(res).toEqual({ status: 200 });
      expect(REST).toHaveBeenCalledTimes(1);
      expect(Routes.guildMemberRole).toHaveBeenCalledWith(undefined, "123", "1234");
    });
  });
});
