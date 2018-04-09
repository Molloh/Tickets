package cn.edu.nju.tickets.util;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.sql.Date;

public class StringtoDateUtil {
    public static Timestamp parseStringToDate(String str) {
        return Timestamp.valueOf(str);
    }
}
