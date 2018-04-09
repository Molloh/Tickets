package cn.edu.nju.tickets.controller;

import cn.edu.nju.tickets.constant.Gender;
import cn.edu.nju.tickets.constant.RegisterStatus;
import cn.edu.nju.tickets.constant.RoleName;
import cn.edu.nju.tickets.entity.*;
import cn.edu.nju.tickets.exception.AppException;
import cn.edu.nju.tickets.payload.*;
import cn.edu.nju.tickets.repository.RoleRepository;
import cn.edu.nju.tickets.repository.StadiumRepository;
import cn.edu.nju.tickets.repository.UserRepository;
import cn.edu.nju.tickets.util.MailUtil;
import cn.edu.nju.tickets.util.ResponseUtil;
import cn.edu.nju.tickets.util.UniqueGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository userRepository;

    private final UniqueGenerator uniqueGenerator;

    private final MailUtil mailUtil;

    private final RoleRepository roleRepository;

    private final StadiumRepository stadiumRepository;

    @Autowired
    public AuthController(
            UserRepository userRepository,
            UniqueGenerator uniqueGenerator,
            MailUtil mailUtil, RoleRepository roleRepository, StadiumRepository stadiumRepository) {
        this.userRepository = userRepository;
        this.uniqueGenerator = uniqueGenerator;
        this.mailUtil = mailUtil;
        this.roleRepository = roleRepository;
        this.stadiumRepository = stadiumRepository;
    }

    @PostMapping("/admin/signin")
    public ResponseEntity<?> authenticateAdmin(@Valid @RequestBody UserSignInRequest userSignInRequest) {
        if (userSignInRequest.getUsernameOrEmail().equals("admin") && userSignInRequest.getPassword().equals("mao1997"))
            return ResponseUtil.returnResponse(new ApiResponse(true, "welcome, master!"));
        else
            return ResponseUtil.returnResponse(new ApiResponse(false, "fail to login!"));
    }

    @PostMapping("/user/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody UserSignInRequest userSignInRequest) {
        User user = userRepository.findByUsernameOrEmail(userSignInRequest.getUsernameOrEmail(), userSignInRequest.getUsernameOrEmail()).orElse(null);
        if (user == null)
            return ResponseUtil.returnResponse(new ApiResponse(false, "cannot find user!"));

        if (user.getRegisterStatus() == RegisterStatus.STATUS_ABOLISHED)
            return ResponseUtil.returnResponse(new ApiResponse(false, "此账号已被注销！"));

        if (user.getPassword().equals(userSignInRequest.getPassword()))
            return ResponseUtil.returnResponse(new ApiResponse(true, "welcome!"));
        else
            return ResponseUtil.returnResponse(new ApiResponse(false, "wrong password"));
    }

    @PostMapping("/user/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserSignUpRequest userSignUpRequest) {
        if(userRepository.existsByUsername(userSignUpRequest.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if(userRepository.existsByEmail(userSignUpRequest.getMail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        User user = new User(userSignUpRequest.getMail(),
                userSignUpRequest.getUsername(),
                userSignUpRequest.getPassword(),
                uniqueGenerator.generateNoise(),
                RegisterStatus.STATUS_SILENT);

        user.setPassword(user.getPassword());

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));
        user.setRoles(Collections.singleton(userRole));

        // Creating user's profile
        UserProfile userProfile = new UserProfile(Gender.SECRET, "");
        userProfile.setUser(user);
        user.setUserProfile(userProfile);

        User result = userRepository.save(user);

        // Send Register Mail
        Boolean bool = mailUtil.sendUserRegisterMail(result.getEmail(), result.getUsername(), result.getNoise());

        if (bool)
            return new ResponseEntity(new ApiResponse(true, "check the mail to activate"), HttpStatus.OK);
        else
            return new ResponseEntity(new ApiResponse(false, "fail to send mail"), HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/user/mail")
    public ResponseEntity<?> activateUser(@RequestParam(value = "username") String username, @RequestParam(value = "noise") String noise) throws URISyntaxException {
        User user = userRepository.findByUsernameAndNoise(username, noise).orElse(null);
        if (user == null)
            return new ResponseEntity(new ApiResponse(false, "User does not exist!"),
                    HttpStatus.BAD_REQUEST);

        user.setRegisterStatus(RegisterStatus.STATUS_AWAKE);

        userRepository.save(user);
        URI location = new URI("http://localhost:8000");
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(location);

        return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
    }

    @PostMapping("/stadium/signin")
    public ResponseEntity<?> authenticateStadium(@Valid @RequestBody StadiumSignInRequest stadiumSignInRequest) {

        Stadium stadium = stadiumRepository.findByStadiumCode(stadiumSignInRequest.getStadiumCode()).orElse(null);
        if (stadium == null)
            return ResponseUtil.returnResponse(new ApiResponse(false, "cannot find stadium!"));

        if (stadium.getPassword().equals(stadiumSignInRequest.getPassword()))
            return ResponseUtil.returnResponse(new ApiResponse(true, "welcome!"));
        else
            return ResponseUtil.returnResponse(new ApiResponse(false, "wrong password"));
    }

    @PostMapping("/stadium/signup")
    public ResponseEntity<?> registerStadium(@Valid @RequestBody StadiumSignUpRequest stadiumSignUpRequest) {
        String stadiumCode = uniqueGenerator.generateStadiumId();

        while (stadiumRepository.existsByStadiumCode(stadiumCode)) {
            stadiumCode = uniqueGenerator.generateStadiumId();
        }

        if(stadiumRepository.existsByEmail(stadiumSignUpRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating stadium's account
        Stadium stadium = new Stadium(stadiumSignUpRequest.getEmail(),
                stadiumCode,
                stadiumSignUpRequest.getPassword(),
                RegisterStatus.STATUS_SILENT,
                uniqueGenerator.generateNoise());

        stadium.setPassword(stadium.getPassword());

        Role stadiumRole = roleRepository.findByName(RoleName.ROLE_STADIUM)
                .orElseThrow(() -> new AppException("Stadium Role not set."));
        stadium.setRoles(Collections.singleton(stadiumRole));

        // Creating stadium's profile
        StadiumProfile stadiumProfile = new StadiumProfile(stadiumSignUpRequest.getStadiumName(), stadiumSignUpRequest.getAddress(), stadiumSignUpRequest.getPhoneNumber());
        stadiumProfile.setStadium(stadium);
        stadium.setStadiumProfile(stadiumProfile);

        stadiumRepository.save(stadium);

        return new ResponseEntity(new ApiResponse(true, "请等待管理员审核"), HttpStatus.OK);
        // Send Register Mail
//        Boolean bool = mailUtil.sendStadiumRegisterMail(result.getEmail(), result.getStadiumCode(), result.getNoise());
//
//        if (bool)
//            return new ResponseEntity(new ApiResponse(true, "check the mail to activate"), HttpStatus.OK);
//        else
//            return new ResponseEntity(new ApiResponse(false, "fail to send mail"), HttpStatus.BAD_REQUEST);
    }

}
