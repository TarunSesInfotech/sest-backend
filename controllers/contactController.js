const nodemailer = require("nodemailer");

exports.sendContactMail = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Direct config (NO ENV)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tarun.mulhera@gmail.com",          // ✅ sender gmail
        pass: "wica chtc iqjh rpid",           // ⚠️ Gmail App Password
      },
    });

    // ✅ Mail content
    const mailOptions = {
      from: `"SEST InfoTech" <tarun.mulhera@gmail.com>`, 
      to: "tarun@sestinfotech.com",
      replyTo: email,
      subject: "New Contact Form Submission",
      html: `
        <h3>New Contact Request</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully ✅" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email ❌" });
  }
};