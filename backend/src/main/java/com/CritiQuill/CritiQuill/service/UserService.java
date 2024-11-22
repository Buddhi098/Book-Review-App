package com.CritiQuill.CritiQuill.service;

import com.CritiQuill.CritiQuill.dto.UserDTO;
import com.CritiQuill.CritiQuill.entity.User;
import com.CritiQuill.CritiQuill.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public ResponseEntity signup(UserDTO userDTO) {
        try {
            Optional<User> existingUser = userRepository.findByEmail(userDTO.getEmail());
            if (existingUser.isPresent()) {
                Map<String, Object> response = new HashMap<>();
                response.put("status", "fail");
                response.put("error", "User Already Exist");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            User user = User.builder()
                    .name(userDTO.getName())
                    .email(userDTO.getEmail())
                    .password(passwordEncoder.encode(userDTO.getPassword()))
                    .addedDate(LocalDateTime.now())
                    .build();

            userRepository.save(user);

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("error", userDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            // Log the exception (optional)
            e.printStackTrace();

            Map<String, Object> response = new HashMap<>();
            response.put("status", "fail");
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    public ResponseEntity login(String email, String password) {
        try {
            Optional<User> user = userRepository.findByEmail(email);
            if (user.isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("status", "fail");
                response.put("error", "User Can not find");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            if (!passwordEncoder.matches(password, user.get().getPassword())) {
                Map<String, Object> response = new HashMap<>();
                response.put("status", "fail");
                response.put("error", "Invalid credentials");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            UserDTO userDTO = UserDTO.builder()
                    .id(user.get().getId())
                    .name(user.get().getName())
                    .email(user.get().getEmail())
                    .build();

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("data", userDTO);
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            // Log the exception (optional)
            e.printStackTrace();

            Map<String, Object> response = new HashMap<>();
            response.put("status", "fail");
            response.put("error", "An error occurred during login. Please try again later.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
