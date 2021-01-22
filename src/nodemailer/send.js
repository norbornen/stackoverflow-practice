// @ts-check
const nodemailer = require("nodemailer");

(async () => {
  try {
    var transporter = nodemailer.createTransport({
      host: "localhost",
      port: 25,
      secure: false,
      auth: {
        user: "user",
        pass: "user"
      },
      tls: {
        rejectUnauthorized: false
      },
    });



    var info = await transporter.sendMail({
      from: "noreply@localhost.dev",
      to: "example@example.com",
      subject: "Hello",
      text: "Hello!"
    });
    console.log("Message sent:\n", info);

  } catch (err) {
    console.error(err);
  }
})();
