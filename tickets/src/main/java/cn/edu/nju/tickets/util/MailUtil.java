package cn.edu.nju.tickets.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
public class MailUtil {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final JavaMailSender mailSender;

    @Value("${mail.fromMail.addr}")
    private String from;

    @Autowired
    public MailUtil(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public boolean sendUserRegisterMail(String email, String username, String noise) {
        MimeMessage message = mailSender.createMimeMessage();
        String register_link = "<html><head></head>\n" +
                "<body>\n" +
                "    <a href=\"http://localhost:5000/api/auth/user/mail?username=" + username + "&noise=" + noise + "\">Welcome to tickets! Click here to activate your account!</a>\n" +
                "</body>\n" +
                "</html>";

        System.out.print(register_link);
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(from);
            helper.setTo(email);
            helper.setSubject("Tickets Authentication");
            helper.setText(register_link, true);

            mailSender.send(message);
            logger.info("mail successfully post");
            return true;

        } catch (MessagingException e) {
            logger.error("errror！", e);
            return false;
        }
    }

    public boolean sendStadiumRegisterMail(String email, String stadiumCode, String noise) {
        MimeMessage message = mailSender.createMimeMessage();
        String register_link = "<html>\n" +
                "<body>\n" +
                "    <a herf=\"http://localhost:5000/api/auth/stadium/mail?stadiumCode=" + stadiumCode + "&noise=" + noise + "\" /a>\n" +
                "</body>\n" +
                "</html>";

        System.out.print(register_link);
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(from);
            helper.setTo(email);
            helper.setSubject("Tickets Authentication");
            helper.setText(register_link, true);

            mailSender.send(message);
            logger.info("mail successfully post");
            return true;

        } catch (MessagingException e) {
            logger.error("errror！", e);
            return false;
        }
    }
}
