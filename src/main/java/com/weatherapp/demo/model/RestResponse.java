package com.weatherapp.demo.model;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestResponse {

	private String message;
	private HttpStatus status;
	private int statusCodeValue;

	public RestResponse(String message, int statusCode, HttpStatus status) {
		// TODO Auto-generated constructor stub
		this.message = message;
		this.statusCodeValue = statusCode;
		this.status = status;
	}

}
