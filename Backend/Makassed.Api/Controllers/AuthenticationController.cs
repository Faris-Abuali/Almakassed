﻿using Makassed.Api.Services.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Makassed.Contracts.Authentication;
using UserManagement.Service.Services.Email;

namespace Makassed.Api.Controllers;

public class AuthenticationController : ApiController
{
    private readonly IAuthenticationService _authenticationService;
    private readonly IMakassedEmailService _emailService;

    public AuthenticationController(IAuthenticationService authenticationService, IMakassedEmailService emailService)
    {
        _authenticationService = authenticationService;
        _emailService = emailService;
    }


    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var registerResult = await _authenticationService.Register(request);

        return registerResult.Match(
            Ok,
            Problem
        );
    }


    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType (StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {        
        var loginResult = await _authenticationService.LogUserIn(request);

        return loginResult.Match(
            Ok,
            Problem
        );
    }


    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [HttpPost("forgot-password")]
    [AllowAnonymous]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
    {
        var userResult = await _authenticationService.GetUserById(request.UserId);

        if (userResult.IsError)
            return Problem(userResult.Errors);

        var token = await _authenticationService.GenerateForgotPasswordToken(userResult.Value);

        var forgotPasswordUrl = Url.Action(nameof(ResetPassword), "Authentication", new { token, email = userResult.Value.Email }, Request.Scheme);
        
        if (forgotPasswordUrl is null)
            return Problem();
        
        await _emailService.SendForgetPasswordEmail(userResult.Value.Email!, forgotPasswordUrl);

        return Ok("Password recovery link is sent to your Email.");
    }


    [ProducesResponseType(StatusCodes.Status200OK)]
    [HttpGet("reset-password")]
    [AllowAnonymous]
    public IActionResult ResetPassword(string token, string email)
    {
        var model = new GetResetPasswordResponse { Token = token, Email = email };

        return Ok(model);
    }


    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword(ResetPasswordRequest request)
    {
        var resetPasswordResult = await _authenticationService.ResetPassword(request);

        return resetPasswordResult.Match(
            Ok,
            Problem
        );
    }   
}