package com.asc.security;

import java.security.MessageDigest;

public class Main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println(encrypt("1234"));
	}
	
	public static String encrypt(String password) {
		String hash = "";
		try {
			MessageDigest algorithm = java.security.MessageDigest.getInstance("MD5");
			algorithm.reset();
			algorithm.update(password.getBytes());
			byte[] md5 = algorithm.digest();
			String tmp = "";
			for (int i = 0; i < md5.length; i++) {
				tmp = (Integer.toHexString(0xFF & md5[i]));
				if (tmp.length() == 1) {
					hash += "0" + tmp;
				} else {
					hash += tmp;
				}
			}
		} catch (Exception e) {
			//log.error("Problem encrypting password: " + password);
		}
		return hash;
	}

}
