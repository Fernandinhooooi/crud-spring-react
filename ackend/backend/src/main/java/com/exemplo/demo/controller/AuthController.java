package com.exemplo.demo.controller;

import com.exemplo.demo.model.Usuario;
import com.exemplo.demo.service.UsuarioService;
import com.exemplo.demo.security.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/register")
    public Usuario register(@RequestBody Usuario usuario) {
        return usuarioService.salvarUsuario(usuario);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Usuario usuario) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(usuario.getEmail(), usuario.getSenha())
        );
        String token = jwtTokenUtil.generateToken((UserDetails) auth.getPrincipal());
        return Map.of("token", token);
    }
}
