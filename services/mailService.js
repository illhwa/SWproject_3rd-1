const nodemailer = require('nodemailer');

// 이메일 전송 함수
exports.sendVerificationEmail = async (toEmail, verificationCode) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // .env에 추가해야 함
            pass: process.env.EMAIL_PASS  // .env에 추가해야 함
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: '지갑 등록을 위한 인증번호입니다.',
        text: `인증번호: ${verificationCode}`
    };

    await transporter.sendMail(mailOptions);
};
