const nodemailer = require("nodemailer");

exports.sendOrderMail = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, city, organization, message } =
      req.body;

    // ✅ Validation
    if (!firstName || !lastName || !email || !phone || !city || !organization) {
      return res.status(400).json({
        message: "All required fields must be filled",
      });
    }

    // ✅ Transporter
    const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "sest@sestinfotech.com",
            pass: "olifpugwalzdlmxg", 
          },
        });

    await transporter.verify();

    // ✅ Mail Content
    const info = await transporter.sendMail({
     from: '"SEST InfoTech Contact Form" <sest@sestinfotech.com>',
      to: "sest@sestinfotech.com",
      replyTo: email,
      subject: "New Order Form Submission",
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
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Order Mail Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send email ❌",
      error: error.message,
    });
  }
};
