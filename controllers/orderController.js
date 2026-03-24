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
      service: "gmail",
      auth: {
        user: "tarun.mulhera@gmail.com",          // ✅ sender gmail
        pass: "wica chtc iqjh rpid",          // ⚠️ Gmail App Password (generate one from your Google Account)
      },
    });

    // ✅ Mail Content
    const mailOptions = {
     from: `"SEST InfoTech" <tarun.mulhera@gmail.com>`, 
      to: "tarun@sestinfotech.com",
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
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Order submitted successfully ✅"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to send email ❌"
    });
  }
};