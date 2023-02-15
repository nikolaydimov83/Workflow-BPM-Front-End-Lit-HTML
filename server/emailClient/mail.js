const nodemailer=require('nodemailer');
module.exports = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nikolay.dimov83@gmail.com',
      pass: 'dxvpsakhmnrjdmzg'
    }
  });
  
  /*const mailOptions = {
    from: 'hello@example.com',
    to: 'ndimov@postbank.bg',
    subject: 'Subject',
    text: 'Email content'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
   console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      // do something useful
    }
  });*/