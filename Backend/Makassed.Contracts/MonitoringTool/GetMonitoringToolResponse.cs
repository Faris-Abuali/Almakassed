using Makassed.Contracts.MonitoringTool.Field;
using Makassed.Contracts.User;

namespace Makassed.Contracts.MonitoringTool;

public class GetMonitoringToolResponse
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public required string Description { get; set; }

    public DateTime LastModified { get; set; }

    public IEnumerable<GetFieldResponse> Fields { get; set; } = new List<GetFieldResponse>();

    public IEnumerable<GetDepartmentResponse> FocalPoints { get; set; } = new List<GetDepartmentResponse>();
}