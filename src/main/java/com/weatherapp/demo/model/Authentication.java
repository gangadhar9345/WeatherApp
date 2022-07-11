package com.weatherapp.demo.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.NonNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Authentication {

	@Id
	String id;

	private @NonNull String username;
	private @NonNull String password;
	private @NonNull List<String> roles;

}
