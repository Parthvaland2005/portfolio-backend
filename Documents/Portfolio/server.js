const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
// serve static files (CSS, JS, images, pdfs) from the project root
app.use(express.static(__dirname));

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.post("/send", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
  user: "parthvaland0509@gmail.com",
  pass: "adldfsxussfrpvxw"
}
    });

    let mailOptions = {
      from: `"Portfolio Contact" <parthvaland0509@gmail.com>`,
      to: "parthvaland0509@gmail.com",
      subject: `New Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `
    };

    await transporter.sendMail(mailOptions);

    console.log("Email Sent Successfully ");
    res.json({ success: true, message: "Message Sent Successfully!" });

  } catch (error) {
    console.error("Email Error ", error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
});
const PORT = process.env.PORT || 5501;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});