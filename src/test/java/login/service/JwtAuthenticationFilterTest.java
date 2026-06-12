package login.service;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

public class JwtAuthenticationFilterTest {
    private final UserDetailsService userDetailsService = mock(UserDetailsService.class);
    private final JwtService jwtService = mock(JwtService.class);
    private final HandlerExceptionResolver handlerExceptionResolver = mock(HandlerExceptionResolver.class);

    private JwtAuthenticationFilter jwtAuthenticationFilter;

    private final HttpServletRequest request = mock(HttpServletRequest.class);
    private final HttpServletResponse response = mock(HttpServletResponse.class);
    private final FilterChain filterChain = mock(FilterChain.class);

    @BeforeEach
    void setUp() {
        jwtAuthenticationFilter = new JwtAuthenticationFilter(userDetailsService, jwtService, handlerExceptionResolver);
        SecurityContextHolder.clearContext();
    }

    @Test
    void doFilterInternalInvalidTokenTest() throws ServletException, IOException {
        when(request.getHeader("Authorization")).thenReturn(null);

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        verify(filterChain, times(1)).doFilter(request, response);
        assertNull(org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication());
    }

    @Test
    void doFilterInternalValidTokenTest() throws ServletException, IOException {
        String token = "valid.jwt.token";
        String email = "a@a.com";

        when(request.getHeader("Authorization")).thenReturn("Bearer " + token);
        when(jwtService.getEmail(token)).thenReturn(email);

        UserDetails userDetails = mock(UserDetails.class);
        when(userDetailsService.loadUserByUsername(email)).thenReturn(userDetails);
        when(jwtService.isValid(token)).thenReturn(true);

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        verify(filterChain, times(1)).doFilter(request, response);
        assertNotNull(org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication());
    }
}
