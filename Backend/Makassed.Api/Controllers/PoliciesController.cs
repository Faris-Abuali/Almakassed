﻿using AutoMapper;
using Makassed.Api.Models.Domain;
using Makassed.Api.Services.Policies;
using Makassed.Contracts.Policy;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Makassed.Api.Controllers;

public class PoliciesController : ApiController
{
    private readonly IPolicyService _policyService;
    private readonly IMapper _mapper;

    public PoliciesController(IPolicyService policyService, IMapper mapper)
    {
        _policyService = policyService;
        this._mapper = mapper;
    }


    // Get All Policies
    [Authorize]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetPolicies()
    {
        var policies = await _policyService.GetPoliciesAsync();
        
        return Ok(_mapper.Map<List<GetPolicyResponse>>(policies));
    }


    // Get Policy by Code
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [HttpGet("{code}")]
    public async Task<IActionResult> GetPolicy(string code)
    {
        var getPolicyResult = await _policyService.GetPolicyByCodeAsync(code);

        return getPolicyResult.Match(
            policy => Ok(_mapper.Map<GetPolicyResponse>(policy)),
            errors => Problem(errors)
        );
    }


    // Create a New Policy
    [Authorize(Roles = "Admin, Sub-Admin")]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreatePolicy([FromForm]CreatePolicyRequest request)
    {
        var policy = _mapper.Map<Policy>(request);

        var policyCreationResult = await _policyService.CreatePolicyAsync(policy);

        return policyCreationResult.Match(
            _ => CreatedAtAction(
                nameof(GetPolicy), 
                new { code = policy.Code }, 
                _mapper.Map<GetPolicyResponse>(policy)
            ),
            errors => Problem(errors)
        );
    }


    // Update a policy by code
    [Authorize(Roles = "Admin, Sub-Admin")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [HttpPut("{code}")]
    public async Task<IActionResult> UpdatePolicy(string code,[FromForm]UpdatePolicyRequest request)
    {
        var policy = _mapper.Map<Policy>(request);

        var updatePolicyResult = await _policyService.UpdatePolicyAsync(code, policy);

        return updatePolicyResult.Match(
            _ => NoContent(),
            errors => Problem(errors)
        );
    }

    // Delete a policy by code
    [Authorize(Roles = "Admin, Sub-Admin")]
    [HttpDelete("{code}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeletePolicy(string code)
    {
        var deletePolicyResult= await _policyService.DeletePolicyAsync(code);
        return deletePolicyResult.Match(
            _ => NoContent(),
            errors => Problem(errors)
        );
    }

    //Delete all policies
    [Authorize(Roles = "Admin, Sub-Admin")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteAllChapterPolicies(Guid chapterId)
    {
        var deleteAllPoliciesResult= await _policyService.DeleteAllChapterPoliciesAsync(chapterId);
        
        return deleteAllPoliciesResult.Match(
            _ => Ok(_mapper.Map<List<GetPolicyResponse>>(deleteAllPoliciesResult.Value)),
            errors => Problem(errors)
        );
    }
}
