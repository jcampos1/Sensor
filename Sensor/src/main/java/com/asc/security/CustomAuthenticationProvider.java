package com.asc.security;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asc.commons.entities.Role;
import com.asc.commons.entities.MAE1001;
import com.asc.dao.interfaces.IUserDAO;
import com.asc.exceptions.LockedCredentialsException;
import com.asc.exceptions.LoginAndPasswordCredentialsException;
import com.asc.exceptions.LoginCredentialsException;
import com.asc.exceptions.MaxAttempsException;
import com.asc.exceptions.MyWebException;
import com.asc.exceptions.PasswdCredentialsException;
import com.asc.service.interfaces.generic.AbstractService;
import com.asc.utils.Constants;
import com.asc.utils.MD5Encrypter;
import com.asc.utils.StringUtil;

@Service("customauthentication")
public class CustomAuthenticationProvider extends AbstractService implements AuthenticationProvider {

	@Autowired
	private IUserDAO userDAO;
	
	@Value("${maxLoginAttemps}")
	private int maxAttemps;

	@Autowired
	SessionFactory sessionFactory;

	@Transactional(noRollbackFor = { AuthenticationException.class }, readOnly = false)
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String username = authentication.getName();
		String password = (String) authentication.getCredentials();

		if ((StringUtil.isEmptyOrNullValue(username)) || (StringUtil.isEmptyOrNullValue(password))) {
			LoginAndPasswordCredentialsException excep = new LoginAndPasswordCredentialsException(
					getMess("info.missing"));

			if (StringUtil.isEmptyOrNullValue(username)) {
				excep.setNoLogin(getMess("required.field"));
			}

			if (StringUtil.isEmptyOrNullValue(password)) {
				excep.setNoPasswd(getMess("required.field"));
			}
			throw excep;
		}
		password = MD5Encrypter.encrypt(password);
		MAE1001 sf = null;
		try {
			sf = userDAO.findbyEmail(username);

			if (sf == null) {
				throw new LoginCredentialsException(getMess(Constants.DONTUSER));
			}

			if (!sf.getActive()) {
				throw new LoginCredentialsException(getMess(Constants.NOVALID));
			}

			if (sf.getUser_bloq()) {
				throw new LockedCredentialsException(getMess(Constants.LOCKED));
			}

			if (password.equals(sf.getUser_pass())) {
				sf.setAtmt(0);
				userDAO.update(sf);
			} else {
				if (sf.getAtmt() >= maxAttemps) {
					sf.setUser_bloq(true);
					userDAO.update(sf);
					sessionFactory.getCurrentSession().flush();
					throw new MaxAttempsException(getMess(Constants.MAXATTEMPS));
				} else {
					sf.setAtmt(sf.getAtmt() + 1);
					userDAO.update(sf);
				}
				sessionFactory.getCurrentSession().flush();
				throw new PasswdCredentialsException(getMess(Constants.NOPASSWD));
			}
		} catch (MyWebException e) {
			throw new LoginCredentialsException(getMess(Constants.NOLOGIN));
		}

		org.springframework.security.core.userdetails.User user = new org.springframework.security.core.userdetails.User(username, password, 
				true, true, true, true, getGrantedAuthorities(sf));

		return new UsernamePasswordAuthenticationToken(user, password, user.getAuthorities());
	}

	public boolean supports(Class<?> arg0) {
		return true;
	}

	private List<GrantedAuthority> getGrantedAuthorities(MAE1001 us) {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		
		for (Role rl : us.getRoles()) {
			authorities.add(new SimpleGrantedAuthority(rl.getName()));
		}
		
		return authorities;
	}
}