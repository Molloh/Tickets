package cn.edu.nju.tickets.util;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MailUtilTest {
    @Autowired
    private MailUtil mailUtil;

    @Test
    public void testHtmlMail() throws Exception {

        mailUtil.sendUserRegisterMail("mollohchiao@hotmail.com", "chiao", "8f09c038a5a74eb09fca50dd1dfc876f");
    }
}