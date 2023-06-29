const { addUserToList, createUser } = require('../../lib/mailchimp.js');
const mailchimp = require('@mailchimp/mailchimp_marketing')

jest.mock('@mailchimp/mailchimp_marketing', () => ({
  setConfig: jest.fn(),
  lists: {
    addListMember: jest.fn(),
  }
}));

describe('add User to list', function() {
  beforeEach(() => {
    mailchimp.lists.addListMember.mockClear();
  })
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
  beforeEach(() => {
    mailchimp.lists.addListMember.mockClear();
  })

  const user = {
    email: "test@gmail.com",
    firstName: "John",
    lastName: "Doe",
  }

  it("Should create user in mailchimp", async () => {
    await createUser(user);

    expect(mailchimp.lists.addListMember).toHaveBeenCalledWith("b578d43584", {
      email_address: "test@gmail.com",
      status: "subscribed",
      merge_fields: {
        EMAIL: "test@gmail.com",
        FIRSTNAME: "John",
        LASTNAME: "Doe",
      },
    });
  });
});