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
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    // ✅ Mail content
    const info = await transporter.sendMail({
      from: `"SEST InfoTech Contact Form" <${process.env.EMAIL_USER}>`,
      to: "tarun@sestinfotech.com",
      replyTo: email,
      subject: "New Contact Form Submission",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h3>New Contact Request</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Message:</b> ${message}</p>
        </div>
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