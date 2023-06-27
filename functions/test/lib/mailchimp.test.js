const mailchimp = require('@mailchimp/mailchimp_marketing');
const { addUserToList, createUser } = require('./your-file-containing-mailchimp-functions');

jest.mock('@mailchimp/mailchimp_marketing', () => ({
  lists: {
    addListMember: jest.fn(),
  },
}));

describe('Mailchimp Functions', () => {
  beforeEach(() => {
    mailchimp.lists.addListMember.mockClear();
  });

  describe('addUserToList', () => {
    test('should add user to cohort and course lists', async () => {
      const emailData = {
        user_email: 'test@example.com',
        params: {
          cohort: 'cohort-list-id',
          course: 'course-list-id',
        },
      };
      await addUserToList(emailData);

      expect(mailchimp.lists.addListMember).toHaveBeenCalledTimes(2);
      expect(mailchimp.lists.addListMember).toHaveBeenCalledWith('cohort-list-id', {
        email_address: 'test@example.com',
        status: 'subscribed',
      });
      expect(mailchimp.lists.addListMember).toHaveBeenCalledWith('course-list-id', {
        email_address: 'test@example.com',
        status: 'subscribed',
      });
    });
  });

  describe('createUser', () => {
    test('should add user to the specified list with merge fields', async () => {
      const user = {
        email: 'test@example.com',
        name: 'Test User',
        age: 25,
      };

      await createUser(user);

      expect(mailchimp.lists.addListMember).toHaveBeenCalledTimes(1);
      expect(mailchimp.lists.addListMember).toHaveBeenCalledWith('b578d43584', {
        email_address: 'test@example.com',
        status: 'subscribed',
        merge_fields: {
          EMAIL: 'test@example.com',
          NAME: 'Test User',
          AGE: 25,
        },
      });
    });

    test('should handle errors', async () => {
      const user = {
        email: 'test@example.com',
        name: 'Test User',
      };

      mailchimp.lists.addListMember.mockImplementationOnce(() => {
        throw new Error('Failed to add user to the list');
      });

      await createUser(user);
    
      expect(console.error).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
