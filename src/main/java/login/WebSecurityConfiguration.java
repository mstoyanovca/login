package login;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry ->
                        authorizationManagerRequestMatcherRegistry
                                .requestMatchers("/login/**", "/register/**", "/forgot-password/**").permitAll()
                                .requestMatchers("/account/**").hasAnyRole("USER", "ADMIN")
                                .anyRequest().authenticated())
                .csrf((csrf) -> csrf
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                        .ignoringRequestMatchers("/login/**", "/register/**", "/forgot-password/**"))
                .sessionManagement(httpSecuritySessionManagementConfigurer ->
                        httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .cors(
                        httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer.configurationSource((request) -> {
                            CorsConfiguration config = new CorsConfiguration();
                            config.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
                            config.setAllowedHeaders(Collections.singletonList("*"));
                            config.setAllowedMethods(Collections.singletonList("*"));
                            config.setExposedHeaders(List.of("Authorization"));
                            config.setAllowCredentials(true);
                            config.setMaxAge(3600L);
                            return config;
                        }));

        return httpSecurity.build();
    }
}
