import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'bradford.leffler@ethereal.email',
        pass: 'QtfRfbtABE5hUEXEdZ'
    }
});

export { transporter };