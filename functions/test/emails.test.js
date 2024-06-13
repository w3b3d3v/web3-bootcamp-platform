const nodemailer = require('nodemailer')
const mandrillTransport = require('nodemailer-mandrill-transport')
const { PubSub } = require('@google-cloud/pubsub')
const { sendEmail, enqueueEmails } = require('../emails.js')

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockReturnValue({ status: 200 }),
  }),
}))

jest.mock('nodemailer-mandrill-transport', () => jest.fn())

jest.mock('@google-cloud/pubsub', () => ({
  PubSub: jest.fn().mockImplementation(() => ({
    topic: jest.fn().mockReturnValue({
      publishMessage: jest.fn(),
    }),
  })),
}))

jest.spyOn(console, 'log')

describe('Testing email services', function () {
  describe('sendEmail function', function () {
    it('should throw an error for non-existent template', async () => {
      let templateName = 'non_existent_template'
      let subject = 'test'
      let to = 'test@gmail.com'

      await expect(sendEmail(templateName, subject, to)).rejects.toThrow()
    })

    it('should call smtpTransport.sendMail with correct params', async () => {
      let templateName = 'cohort_new_chance.js'
      let subject = 'test'
      let to = 'test@gmail.com'

      let res = await sendEmail(templateName, subject, to)
      expect(res).toEqual({ status: 200 })
    })

    it('should thrwo error if template exists but wrong params', async() => {
      let templateName = 'course_day.js'
      let subject = 'test'
      let to = 'test@gmail.com'

      await expect(sendEmail(templateName, subject, to)).rejects.toThrow()
    })
  })

  describe('enqueueEmails function', function () {
    describe('email list is not empty', function() {
      const emails = ['test1@gmail.com', 'test2@gmail.com']

      it('should call pubsub.topic.publishMessage', async () => {
        let template = 'cohort_new_chance.js'
        let subject = 'test'
        let params = {}

        await enqueueEmails(emails, template, subject, params)
        expect(PubSub).toHaveBeenCalled()
        expect(console.log).toHaveBeenCalledWith('Sent emails: ' + emails.length)
      })
    })

    describe('email list is empty', function() {
      beforeEach(() => {
        pubsub = new PubSub()
      })
      const emails = []
      it('should not call pubsub.topic.publishMessage', async () => {
        let template = 'cohort_new_chance.js'
        let subject = 'test'
        let params = {}

        await enqueueEmails(emails, template, subject, params)
        expect(pubsub.topic().publishMessage).not.toHaveBeenCalled()
        expect(console.log).toHaveBeenCalledWith('Sent emails: ' + emails.length)
      })
    })
  })
})