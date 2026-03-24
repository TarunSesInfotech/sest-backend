// const nodemailer = require("nodemailer");

// exports.sendContactMail = async (req, res) => {
//   try {
//     const { name, email, phone, message } = req.body;

//     // Validation
//     if (!name || !email || !phone || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // Gmail transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "sest@sestinfotech.com",
//         pass: "olif pugw alzd lmxg", 
//       },
//     });

//     // Verify SMTP
//     await transporter.verify();
//     console.log("✅ SMTP Connected Successfully");

//     // Send Mail
//     const info = await transporter.sendMail({
//       from: '"SEST InfoTech Contact Form" <sest@sestinfotech.com>',
//       to: "sest@sestinfotech.com",
//       replyTo: email,
//       subject: "New Contact Form Submission",
//       html: `
//         <div style="font-family: Arial, sans-serif; line-height: 1.6;">
//           <h2 style="color:#333;">New Contact Form Submission</h2>
//           <p><strong>Name:</strong> ${name}</p>
//           <p><strong>Email:</strong> ${email}</p>
//           <p><strong>Phone:</strong> ${phone}</p>
//           <p><strong>Message:</strong> ${message}</p>
//         </div>
//       `,
//     });

//     console.log("✅ Mail Sent:", info.messageId);

//     return res.status(200).json({
//       success: true,
//       message: "Email sent successfully ✅",
//       messageId: info.messageId,
//     });
//   } catch (error) {
//     console.error("❌ Contact Mail Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to send email ❌",
//       error: error.message,
//     });
//   }
// };


const nodemailer = require("nodemailer");

exports.sendContactMail = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Gmail SMTP Transporter (Render Friendly)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // 587 => false
      auth: {
        user: "sest@sestinfotech.com",
       pass: "olif pugw alzd lmxg", 
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });

    console.log("⏳ Verifying SMTP...");
    await transporter.verify();
    console.log("✅ SMTP Connected Successfully");

    // Send Mail
    const info = await transporter.sendMail({
      from: '"SEST InfoTech Contact Form" <sest@sestinfotech.com>',
      to: "sest@sestinfotech.com",
      replyTo: email,
      subject: "New Contact Form Submission",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color:#333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      `,
    });

    console.log("✅ Mail Sent:", info.messageId);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully ✅",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("❌ Contact Mail Error FULL:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send email ❌",
      error: error.message,
      code: error.code || null,
      response: error.response || null,
      responseCode: error.responseCode || null,
    });
  }
};