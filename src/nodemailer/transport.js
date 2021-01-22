// @ts-check
const DOMAIN = "sode.su";

const fs = require("fs");
const SMTPServer = require("smtp-server").SMTPServer;
const parser = require("mailparser").simpleParser;

const server = new SMTPServer({
  secure: false,
  // key: fs.readFileSync("/etc/letsencrypt/live/sode.su/privkey.pem"),
  // cert: fs.readFileSync("/etc/letsencrypt/live/sode.su/cert.pem"),

  onRcptTo({ address }, session, callback) {
    if (address.startsWith("noreply@"))
      return callback(new Error(`Address ${address} is not allowed receiver`));
    callback();
  },

  onAuth(auth, session, callback) {
    if (auth.username !== "user" || auth.password !== "user")
      return callback(new Error("Invalid username or password!"));
    callback(null, { user: 1 });
  },

  // onConnect(session, callback) {
  //   return callback();
  // },

  // onClose(session) { },

  // onMailFrom(address, session, callback) {
  //   return callback();
  // },

  authOptional: true,

  ___onData(stream, session, callback) {
    // Stream – Поток с данными письма. Callback вызывается по окончанию парсинга.
    // в этом обработчике мы будем парсить письмо.

    var parts = [];
    var buffer;

    stream.on("data", data => {
      parts.push(data);
    });

    stream.on("end", () => {
      buffer = Buffer.concat(parts);

      parser(buffer, {}, (err, mail) => {
        try {
          if (err)
            return console.error(err);

          console.log(mail);
        } catch (err) {
          console.error(err);
        }
        callback();
      });
    });
  }
});


process.on('uncaughtException', err => {
  console.error("Caught exception: " + err);
});

server.listen(25);
