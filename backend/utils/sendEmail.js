const nodeMailer=require('nodemailer');

const sendEmail=async(options)=>{
    const transporter= nodeMailer.createTransport({
        // host:process.env.SMPT_HOST,
        // port:process.env.SMPT_PORT,
        service:process.env.SMPT_SERVICE,
        // ignoreTLS: false,
        // secure: false,
        auth:{
           user:process.env.SMPT_MAIL,
        //    pass:"maneesh1120"
           pass:process.env.SMPT_PASSWORD
        }
    })

    const mailOptions= {
        from:process.env.SMPT_MAIL,
        to:options.mail,
        subject:options.subject,
        message:options.message
    }

    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;