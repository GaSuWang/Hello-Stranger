package com.ssafy.api.controller;

import com.ssafy.api.dto.*;
import com.ssafy.api.request.CategoryChoiceReq;
import com.ssafy.api.request.UserRegistReq;
import com.ssafy.api.response.BaseResponseBody;
import com.ssafy.api.response.UserChoiceGetRes;
import com.ssafy.api.response.UserRegistRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.HelloStrangerUserDetails;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.PumpStreamHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import static com.ssafy.common.python.CallPython.exePython;

@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping()
    @ApiOperation(value = "소셜로그인, 소셜회원가입", notes = "저장되지 않은 이메일 일 시에는 회원가입과 로그인을 시키고, 저장된 이메일 일 시에는 로그인 시켜준다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
//            @ApiResponse(code = 901, message = "유효하지 않은 값"),
    })
    public ResponseEntity<UserRegistRes> registUser(@RequestBody UserRegistReq userRegistReq){

        String email = userRegistReq.getEmail();
        String nickname = userRegistReq.getNickname();
        String img = userRegistReq.getImg();

        //이미일 중복 확인
        User user = userService.getUserByUserEmail(userRegistReq.getEmail());

        // 없으면 회원가입
        if(user == null){
            user = userService.createUser(email, nickname, img);
        }

        // accessToken 반환
        String accessToken = JwtTokenUtil.getToken(email);
        UserRegistRes res = UserRegistRes.builder()
                .accessToken(accessToken)
                .build();
        return ResponseEntity.status(200).body(res);
    }

    @DeleteMapping()
    @ApiOperation(value = "회원탈퇴", notes = "회원 탈퇴")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
//            @ApiResponse(code = 901, message = "유효하지 않은 값"),
    })
    public ResponseEntity<Void> deleteUser(@ApiIgnore Authentication authentication){
        // auth에서 가져오기
        HelloStrangerUserDetails userDetails = (HelloStrangerUserDetails)authentication.getDetails();
        User user = userDetails.getUser();

        // 탈퇴 처리
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/choice")
    @ApiOperation(value = "유저 취향 조사 목록", notes = "회원가입 시 유저의 취향조사에 필요한 음악/음식/활동 목록을 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public ResponseEntity<UserChoiceGetRes> getUserChoice(){
        UserChoiceGetResMusic music = UserChoiceGetResMusic.builder()
                .musicId(1)
                .musicName("Waves")
                .musicArtist("Paige")
                .musicImgUrl("https://firebasestorage.googleapis.com/v0/b/viewdle-b6bf5.appspot.com/o/ch%40ssafy.com_profile?alt=media&token=e0584d41-eced-40bb-b79d-e395f1203855")
                .build();

        UserChoiceGetResFood food = UserChoiceGetResFood.builder()
                .foodCategory("떡볶이")
                .foodImgUrl("https://firebasestorage.googleapis.com/v0/b/viewdle-b6bf5.appspot.com/o/ch%40ssafy.com_profile?alt=media&token=e0584d41-eced-40bb-b79d-e395f1203855")
                .build();

        UserChoiceGetResActivity activity = UserChoiceGetResActivity.builder()
                .activityCategory("호캉스")
                .activityImgUrl("https://firebasestorage.googleapis.com/v0/b/viewdle-b6bf5.appspot.com/o/ch%40ssafy.com_profile?alt=media&token=e0584d41-eced-40bb-b79d-e395f1203855")
                .build();


        List<UserChoiceGetResMusic> musicList = new ArrayList<>();
        for(int i = 0; i < 5; i++){
            musicList.add(music);
        }

        List<UserChoiceGetResFood> foodList = new ArrayList<>();
        for(int i = 0; i < 5; i++){
            foodList.add(food);
        }

        List<UserChoiceGetResActivity> activityList = new ArrayList<>();
        for(int i = 0; i < 5; i++){
            activityList.add(activity);
        }

        UserChoiceGetRes res = UserChoiceGetRes.builder()
                .music(musicList)
                .food(foodList)
                .activity(activityList)
                .build();
        return ResponseEntity.status(200).body(res);
    }


    @PostMapping("/choice")
    @ApiOperation(value = "유저 취향 선택", notes = "회원가입 시 취향조사에서 유저가 선택한 음악/음식/활동 목록을 저장한다 ")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 901, message = "유효하지 않은 값"),
    })
    public ResponseEntity<? extends BaseResponseBody> registUserChoice(@RequestBody CategoryChoiceReq categoryChoiceReq){

        // 재구현시 함수화
        List<IdChoiceYN> music = categoryChoiceReq.getMusic();
        for(IdChoiceYN c : music){
            String yn = c.getChoiceYN();
            if("Y".equals(yn) || "N".equals(yn)) continue;
            else return ResponseEntity.status(901).body(BaseResponseBody.of(901, "유효하지 않은 값입니다."));
        }

        List<CategoryChoiceYN> food = categoryChoiceReq.getFood();
        for(CategoryChoiceYN c : food){
            String yn = c.getChoiceYN();
            if("Y".equals(yn) || "N".equals(yn)) continue;
            else return ResponseEntity.status(901).body(BaseResponseBody.of(901, "유효하지 않은 값입니다."));
        }
        
        List<CategoryChoiceYN> activity = categoryChoiceReq.getActivity();
        for(CategoryChoiceYN c : activity){
            String yn = c.getChoiceYN();
            if("Y".equals(yn) || "N".equals(yn)) continue;
            else return ResponseEntity.status(901).body(BaseResponseBody.of(901, "유효하지 않은 값입니다."));
        }

        URL activityRecommend = getClass().getClassLoader().getResource("activity_contents_based.py");
        String[] command = new String[2];
        command[0] = "python";
        command[1] = new File(activityRecommend.getPath()).getAbsolutePath();

        try {
            exePython(command);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "정상적으로 저장되었습니다."));
    }
}
