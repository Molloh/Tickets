package cn.edu.nju.tickets.util;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UniqueGeneratorTests {

    @Autowired
    UniqueGenerator uniqueGenerator;

    @Test
    public void generateStadiumId() {
        String id0 = uniqueGenerator.generateStadiumId();
        String id1 = uniqueGenerator.generateStadiumId();

        assertNotEquals("same id", id0, id1);
    }

    @Test
    public void generateNoise() {
        String noise0 = uniqueGenerator.generateNoise();
        String noise1 = uniqueGenerator.generateNoise();
        assertNotEquals("same noise", noise0, noise1);
    }

}