﻿namespace Makassed.Api.Models.Domain;

public class Department
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    //public string HeadId { get; set; } = null!;

    //public MakassedUser Head { get; set; } = null!;

    public List<MonitoringTool> MonitoringTools { get; set; } = new();

    public ICollection<MakassedUser> Users { get; set; } = new List<MakassedUser>();
}
