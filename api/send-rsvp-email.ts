import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { generateRsvpEmailHtml } from '@/lib/emailTemplate';

export async function sendRsvpEmailHandler(req: any, res: any) {
  try {
    const { guest, emailAddress } = req.body;

    if (!guest || !guest.fullName) {
      return res.status(400).json({ error: 'Missing guest details in request.' });
    }

    const recipient = emailAddress || guest?.email;

    if (!recipient) {
      return res.status(400).json({ 
        error: 'No valid recipient email provided in request (guest.email or emailAddress).' 
      });
    }

    const PORT = 3000;
    const baseUrl = process.env.APP_URL || `http://localhost:${PORT}`;

    // Generate HTML email content
    const htmlContent = await generateRsvpEmailHtml(guest, baseUrl);

    let emailSent = false;
    let emailError: string | null = null;
    let serviceUsed = 'none';

    const resendApiKey = process.env.RESEND_API_KEY;
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    // Hardcoded verified sender address using your custom domain
    const senderEmail = process.env.RESEND_FROM_EMAIL || 'Phylis & Collins Wedding <philcollinsinvite@chartisanddonis.co.ke>';

    // 1. Try sending via Resend first
    if (resendApiKey) {
      try {
        serviceUsed = 'Resend';
        const resend = new Resend(resendApiKey);

        const response = await resend.emails.send({
          from: senderEmail,
          to: [recipient],
          subject: `✨ Official RSVP Confirmation & Wedding Pass for ${guest.fullName}`,
          html: htmlContent,
        });

        if (response.error) {
          console.error('Resend delivery error:', response.error);
          emailError = response.error.message || JSON.stringify(response.error);
        } else {
          emailSent = true;
        }
      } catch (err: any) {
        console.error('Failed to send email via Resend:', err);
        emailError = err?.message || 'Resend service failed';
      }
    }

    // 2. Fallback to SMTP nodemailer if Resend fails or is missing
    if (!emailSent && smtpHost && smtpUser && smtpPass) {
      try {
        serviceUsed = 'SMTP';
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || senderEmail,
          to: recipient,
          subject: `✨ Official RSVP Confirmation & Wedding Pass for ${guest.fullName}`,
          html: htmlContent,
        });

        emailSent = true;
        emailError = null;
      } catch (err: any) {
        console.error('Failed to send email via SMTP transporter:', err);
        emailError = err?.message || 'SMTP delivery failed';
      }
    }

    // Construct response status message
    let message = `RSVP Pass generated successfully!`;
    if (emailSent) {
      message = `Official RSVP Confirmation Email delivered to ${recipient} via ${serviceUsed}!`;
    } else if (!resendApiKey && !smtpHost) {
      message = `RSVP Pass recorded for ${recipient}! Set RESEND_API_KEY in environment variables to send emails.`;
    } else if (emailError) {
      message = `Failed to deliver email to ${recipient}. Error: ${emailError}`;
    }

    return res.status(emailSent ? 200 : 500).json({
      success: emailSent,
      emailSent,
      serviceUsed,
      emailError,
      recipient,
      message,
      previewHtml: htmlContent,
    });
  } catch (error: any) {
    console.error('Error handling send-rsvp-email endpoint:', error);
    return res.status(500).json({ 
      error: error?.message || 'Internal server error processing RSVP email.',
      details: String(error)
    });
  }
}

export default sendRsvpEmailHandler;
