package com.leave.config;
 
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
 
@Configuration
public class WebConfig implements WebMvcConfigurer {
	@Override
  public void addCorsMappings(CorsRegistry registry) {
      registry.addMapping("/**")   // This applies to all endpoints
              .allowedOrigins("*") // Allow requests from this origin
              .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Allow common HTTP methods
              .allowedHeaders("Content-Type", "Authorization")  // Allow these headers
              .allowCredentials(true);  // Allow cookies/credentials if needed
  }
}