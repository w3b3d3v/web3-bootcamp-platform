const { addUserToList } = require('../../lib/mailchimp.js');
const mailchimp = require('@mailchimp/mailchimp_marketing')

jest.mock('@mailchimp/mailchimp_marketing', () => ({
  setConfig: jest.fn(),
  lists: {
    addListMember: jest.fn(),
  }
}));

describe('add User to list', function() {
  it("Should add users to list correctly", async () => {
    const emailData = {
      user_email: "example@gmail.com",
      firstName: "John",
      lastName: "Doe",
      params: {
        cohort: "test",
        course: "test",
      },
    };

    await addUserToList(emailData);

    expect(mailchimp.setConfig).toHaveBeenCalledTimes(1);

    expect(mailchimp.lists.addListMember).toHaveBeenCalledWith("test", {
      email_address: "example@gmail.com",
      status: 'subscribed',
    });
  
    expect(mailchimp.lists.addListMember).toHaveBeenCalledTimes(2);
  });
});

describe("create user in mailchimp", () => {
  const user = {
    email: "test@gmail.com",
    firstName: "John",
    lastName: "Doe",
  }

  it("Should create user in mailchimp", async () => {
    await addUserToList(user);

    expect(mailchimp.lists.addListMember).toHaveBeenCalledWith("b578d43584", {
      email_address: "test@gmail.com",
      status: "subscribed",
      merge_fields: {
        FIRSTNAME: "John",
        LASTNAME: "Doe",
      },
    });
  });
});
