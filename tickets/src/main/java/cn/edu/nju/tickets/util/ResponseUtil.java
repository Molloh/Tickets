package cn.edu.nju.tickets.util;

import cn.edu.nju.tickets.payload.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseUtil {
    public static ResponseEntity<?> returnResponse(ApiResponse apiResponse) {
        if (apiResponse.getSuccess())
            return ResponseEntity.ok(apiResponse);
        else
            return new ResponseEntity(apiResponse, HttpStatus.OK);
    }
}
