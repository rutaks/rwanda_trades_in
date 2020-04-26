import env from "custom-env";
import sgMail from "@sendgrid/mail";

env.env();
sgMail.setApiKey(process.env.SENDGRID_KEY);

const className = "EmailSender";
const companyName = "RwandaTradesIn";
const companyEmail = process.env.EMAIL_SENDER;
/**a
 * @name MailSender
 * This Class A Spot To Send Emails
 * @author Awesomity Lab
 * @since v3.0
 */
class EmailHelper {
  /**
   * This Method Is In Charge Of  Form Details To An Email
   * @param {*} email email provided by the form
   * @param {*} name name of the form sender
   * @param {*} content text entered alonside the form details
   * @return {null}
   */
  static async sendSGMail(receiver, subject, content) {
    const message = {
      to: receiver,
      from: {
        email: companyEmail,
        name: companyName,
      },
      html: content,
      subject: subject,
    };
    // eslint-disable-next-line no-useless-catch
    try {
      await sgMail.send(message);
    } catch (error) {
      console.error(`${className}/ERR:`, error);
      throw error;
    }
  }

  static async sendMagicLinkEmail(req, accountOwner, token) {
    try {
      const emailReceiver = accountOwner.email;
      const accountOwnerName = `${accountOwner.firstName} ${accountOwner.lastName}`;
      const host = req.headers.host;
      const link = `http://${host}/api/v1/auth/login/magic-link/?token=${token}`;
      const text = `Hi ${accountOwnerName} \n  Please click on the following link ${link} 
      to login.`;
      const subject = "Magic Link Login";

      const mail = {
        to: emailReceiver,
        from: {
          email: companyEmail,
          name: companyName,
        },
        html: text,
        subject: subject,
      };
      await sgMail.send(mail);
    } catch (error) {
      console.error(`${className}/ERR:`, error);
      throw error;
    }
  }

  static async sendForgotPasswordMail(req, accountOwner, passwordResetToken) {
    try {
      const emailReceiver = accountOwner.email;
      const accountOwnerName = `${accountOwner.firstname} ${accountOwner.lastname}`;
      const host = req.headers.host;
      const token = passwordResetToken;
      const link = `http://${host}/auth/reset-password/${token}`;
      const text = `Hi ${accountOwnerName} \n  Please click on the following link ${link} 
      to reset your password. \n\n 
      If you did not request this, please ignore this email and your password will 
      remain unchanged.\n`;
      const subject = "Password change request";
      const mail = {
        to: emailReceiver,
        from: {
          email: companyEmail,
          name: companyName,
        },
        html: text,
        subject: subject,
      };
      await sgMail.send(mail);
    } catch (error) {
      console.error(`${className}/ERR:`, error);
      throw error;
    }
  }

  static async sendAdminAccountCreationEmail(req, admin) {
    try {
      const emailReceiver = admin.email;
      const accountOwnerName = `${admin.firstname} ${admin.lastname}`;
      const host = req.headers.host;
      const token = admin.accountCreationToken;
      const link = `http://${host}/auth/final-step/${token}`;
      const text = `Hi ${accountOwnerName} \n  Please click on the following link ${link} 
      to validate your account.\n\n`;
      const subject = "Account creation";
      const mail = {
        to: emailReceiver,
        from: {
          email: companyEmail,
          name: companyName,
        },
        html: text,
        subject: subject,
      };
      await sgMail.send(mail);
    } catch (error) {
      console.error(`${className}/ERR:`, error);
      throw error;
    }
  }

  static async sendPasswordResetEmail(user) {
    const subject = "Your password has been changed";
    const text = `Hello there, \n 
                    This is a confirmation that the password for your account has just been changed.\n`;
    const mail = {
      to: user.email,
      from: {
        email: companyEmail,
        name: companyName,
      },
      html: text,
      subject: subject,
    };
    await sgMail.send(mail);
  }
}

export default EmailHelper;
