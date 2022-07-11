package com.weatherapp.demo.exception;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.http.HttpStatus;

@Document
public class APIRequestException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private HttpStatus status;

	public APIRequestException(String message, Throwable cause) {
		super(message, cause);

	}

	public APIRequestException(Throwable cause) {
		super(cause);

	}

	public APIRequestException(String message, HttpStatus status) {
		super(message);
		this.status = status;
	}

	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

}
