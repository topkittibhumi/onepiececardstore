import nodemailer from 'nodemailer'
import Sib from 'sib-api-v3-sdk'

const sendEmail = (options) => {

    const client = Sib.ApiClient.instance

    // Configure API key authorization: api-key
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = process.env.EMAIL_API_KEY

    const tranEmailApi = new Sib.TransactionalEmailsApi()
    const sender = {
        email: process.env.EMAIL,
        name: process.env.EMAIL_NAME,
    }
    const receivers = [
        {
            email: options.to,
        },
    ]
    tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: options.subject,
        htmlContent: options.text,
        params: {
            role: 'Frontend',
        },
    })
    .then(console.log)
    .catch(console.log)
};
export default sendEmail