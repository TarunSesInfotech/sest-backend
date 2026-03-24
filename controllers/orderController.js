const nodemailer = require("nodemailer");

exports.sendOrderMail = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      city,
      organization,
      message
    } = req.body;

    // ✅ Validation
    if (!firstName || !lastName || !email || !phone || !city || !organization) {
      return res.status(400).json({
        message: "All required fields must be filled"
      });
    }

    // ✅ Transporter
   const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  family: 4, // force IPv4
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

     await transporter.verify();

    // ✅ Mail Content
    const info = await transporter.sendMail({
      from: `"SEST InfoTech Contact Form" <${process.env.EMAIL_USER}>`,
      to: "sest@sestinfotech.com",
      replyTo: email,
      subject: "New Contact Form Submission",
      html: `
        <h2>New Order Form Submission</h2>

        <p><b>First Name:</b> ${firstName}</p>
        <p><b>Last Name:</b> ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>City:</b> ${city}</p>
        <p><b>Organization:</b> ${organization}</p>
        <p><b>Message:</b> ${message || "N/A"}</p>
      `,
    });

    console.log("Mail sent successfully:", info.messageId);

    res.status(200).json({
      success: true,
      message: "Email sent successfully ✅",
    });

  } catch (error) {
    console.error("Contact Mail Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send email ❌",
      error: error.message,
    });
  }
};