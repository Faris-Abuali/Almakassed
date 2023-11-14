﻿using Makassed.Api.Data;
using Makassed.Api.Models.Domain;

namespace Makassed.Api.Repositories;

public class SqlSubmissionRepository : ISubmissionRepository
{
    private readonly MakassedDbContext _dbContext;

    public SqlSubmissionRepository(MakassedDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Submission> AddSubmission(Submission submission)
    {
        var createdSubmission = await _dbContext.Submissions.AddAsync(submission);

        return createdSubmission.Entity;
    }
}
