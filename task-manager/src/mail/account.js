const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  const message = {
    to: email,
    from: "task-manager@app.com",
    subject: "Welcome aboard.",
    text: `Welcome aboard ${name}. We are so happy know that you now with us!`
  };

  sgMail.send(message);
};

const sendCancelationEmail = (email, name) => {
  const message = {
    to: email,
    from: "task-manager@app.com",
    subject: "Sad news!",
    text: `${name}, we get sad news from you, your account was successfully deleted. :'(`
  };

  sgMail.send(message);
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
};
