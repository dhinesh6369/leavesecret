package com.leave.config;
 
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
 
@Configuration
public class WebConfig implements WebMvcConfigurer {
	@Override
  public void addCorsMappings(CorsRegistry registry) {
      registry.addMapping("/**")   // This applies to all endpoints
              .allowedOrigins("http://15.168.114.125:3000","http://localhost:3000") // Allow requests from this origin
              .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Allow common HTTP methods
              .allowedHeaders("Content-Type", "Authorization")  // Allow these headers
              .allowCredentials(true);  // Allow cookies/credentials if needed
  }
}