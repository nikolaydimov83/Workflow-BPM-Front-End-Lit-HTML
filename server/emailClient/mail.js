const nodemailer=require('nodemailer');
const emailAdress='nikolay.dimov83@gmail.com'
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nikolay.dimov83@gmail.com',
      pass: 'dxvpsakhmnrjdmzg'
    }
  });

function serverSendMail(from,to,mailSubject,content){
const mailOptions={
  from: from,
  to: to,
  subject: mailSubject,
  text: content
}

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
})

}

function prepareMailContent(request){
  return `
  Plan B заявка с id: ${request._id} 
  По апликация ${request.iApplyId} 
  На клиент ${request.clientName}, 
  ЕГФН:${request.clientEGFN} беше прехвърлена на статус ${request.status.statusName}`
}
  
  /*const mailOptions = {
    from: 'hello@example.com',
    to: 'ndimov@postbank.bg',
    subject: 'Subject',
    text: 'Email content'
  };*/
  
module.exports={serverSendMail,emailAdress,prepareMailContent};