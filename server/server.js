const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("express").Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

app.use(cors());
let port = process.env.NODE_ENV !== "production" && 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// endpoint that sends message
router.post("/create-user", async (req, res) => {
  console.log(req.body);
  try {
    const result = await sendMail(req.body);
    res.send({ msg: "sucess", result });
  } catch (error) {
    console.log(error);
  }
});

// root endpoint
app.use("/", router);
app.listen(port, () =>
  console.log(`app is listening at http://localhost:${port}`)
);

//sends message to email
async function sendMail(user) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "arizetbest@gmail.com",
      pass: "Esther.2020?",
    },
  });

  let info = await transporter.sendMail({
    from: `${user.name} <${user.email}>`,
    to: "arizethankgod@gmail.com",
    subject: "Contact",
    html: `
     <html>
        <head>
        <style>
        table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
        }

        td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        }

        tr:nth-child(even) {
        background-color: #dddddd;
        }
        </style>
        </head>
        <body>

        <h2>RECEIVED INFORMATION FROM CUSTOMERS</h2>

        <table>
        <tr>
            <th>FIELD NAME</th>
            <th>VALUE FROM USER</th>
        </tr>
        <tr>
            <td>name
        </td>
            <td>${user.name}</td>
        
        </tr>
        <tr>
            <td>email</td>
            <td>${user.email}</td>
            
        </tr>
        <tr>
            <td>Message</td>
            <td>${user.message}</td>
        
        </tr>
        
        </table>

        </body>
        </html>
`,
  });

  console.log("Message sent: %s", info.messageId);
}
