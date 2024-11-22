package com.CritiQuill.CritiQuill.controller;

import com.CritiQuill.CritiQuill.dto.LoginRequestDTO;
import com.CritiQuill.CritiQuill.dto.UserDTO;
import com.CritiQuill.CritiQuill.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody UserDTO userDTO) {
        return userService.signup(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO loginRequestDTO) {
        return userService.login(loginRequestDTO.getUsername(), loginRequestDTO.getPassword());

    }
}
