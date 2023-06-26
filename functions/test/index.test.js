// as far as I understand, when testing functions in index, we want to be sure that index is calling them the right way. To tes each function implementation, this should be done in the function's own test file. (for example, email sending should be tested in emails.test.js)


const { sendEmail } = require('../index');
const { sendEmail: sendEmailModule } = require('../emails');

jest.mock('../emails', () => ({
  sendEmail: jest.fn(),
}));

describe('Send Email', () => {
  it("should send an email with default subject when no subject provided", async () => {
    sendEmailModule.mockResolvedValueOnce("Email sent");
    const req = {
      query: {
        template: 'template',
        to: 'test@test.com',
      }
    };

    const resp = {
      send: jest.fn(),
    }

    await sendEmail(req, resp);

    expect(sendEmailModule).toHaveBeenCalledWith(
      req.query.template,
      expect.stringContaining('🏕️ Seu primeiro Smart Contract na Ethereum'),
      req.query.to,
    );

    expect(resp.send).toHaveBeenCalledWith('Email sent');
  });
});