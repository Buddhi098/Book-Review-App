package com.CritiQuill.CritiQuill.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserDTO {

    private Long id;
    private String name;
    private String email;
    private String password;
}
