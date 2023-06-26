
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