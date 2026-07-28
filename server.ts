import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { generateRsvpEmailHtml, generateRsvpEmailText } from './src/lib/emailTemplate';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API Route: Send RSVP Confirmation Email
  app.post('/api/send-rsvp-email', async (req, res) => {
    try {
      const { guest, emailAddress } = req.body;

      if (!guest || !guest.fullName) {
        return res.status(400).json({ error: 'Missing guest details in request.' });
      }

      const recipient = emailAddress || guest.email;
      const baseUrl = process.env.APP_URL || `http://localhost:${PORT}`;

      // Generate HTML email content and Plain Text fallback with Cloudinary uploaded assets
      const htmlContent = await generateRsvpEmailHtml(guest, baseUrl);
      const textContent = generateRsvpEmailText(guest, baseUrl);
      const replyToEmail = process.env.REPLY_TO_EMAIL || 'cardsandgiftske@gmail.com';

      let emailSent = false;
      let emailError: string | null = null;
      let serviceUsed = 'none';

      const resendApiKey = process.env.RESEND_API_KEY;
      const smtpHost = process.env.SMTP_HOST;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      // 1. Try sending via Resend first if RESEND_API_KEY is configured
      if (recipient && resendApiKey) {
        try {
          serviceUsed = 'Resend';
          const resend = new Resend(resendApiKey);
          const fromEmail = process.env.RESEND_FROM_EMAIL || 'Phylis & Collins Wedding <onboarding@resend.dev>';
          
          const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: [recipient],
            replyTo: replyToEmail,
            subject: `✨ Official RSVP Confirmation & Wedding Pass for ${guest.fullName}`,
            html: htmlContent,
            text: textContent,
            headers: {
              'X-Entity-Ref-ID': guest.id,
              'List-Unsubscribe': `<mailto:${replyToEmail}?subject=Unsubscribe>`,
            },
          });

          if (error) {
            console.error('Resend delivery error:', error);
            emailError = typeof error === 'object' ? (error as any).message || JSON.stringify(error) : String(error);
          } else {
            emailSent = true;
          }
        } catch (err: any) {
          console.error('Failed to send email via Resend:', err);
          emailError = err?.message || 'Resend service failed';
        }
      }

      // 2. Fallback to SMTP nodemailer if Resend not sent and SMTP details provided
      if (!emailSent && recipient && smtpHost && smtpUser && smtpPass) {
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
            from: process.env.SMTP_FROM || `"Phylis & Collins Wedding" <${smtpUser}>`,
            to: recipient,
            replyTo: replyToEmail,
            subject: `✨ Official RSVP Confirmation & Wedding Pass for ${guest.fullName}`,
            html: htmlContent,
            text: textContent,
            headers: {
              'X-Entity-Ref-ID': guest.id,
              'List-Unsubscribe': `<mailto:${replyToEmail}?subject=Unsubscribe>`,
            },
          });

          emailSent = true;
          emailError = null;
        } catch (err: any) {
          console.error('Failed to send email via SMTP transporter:', err);
          emailError = err?.message || 'SMTP delivery failed';
        }
      }

      let message = `RSVP Pass generated successfully!`;
      if (emailSent) {
        message = `Official RSVP Confirmation Email delivered to ${recipient} via ${serviceUsed}!`;
      } else if (recipient && !resendApiKey && !smtpHost) {
        message = `RSVP Pass recorded for ${recipient}! Set RESEND_API_KEY in environment variables to enable live Resend email delivery.`;
      }

      return res.json({
        success: true,
        emailSent,
        serviceUsed,
        emailError,
        recipient: recipient || null,
        message,
        previewHtml: htmlContent,
      });
    } catch (error: any) {
      console.error('Error handling send-rsvp-email endpoint:', error);
      return res.status(500).json({ error: 'Internal server error processing RSVP email.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
