namespace Makassed.Contracts.MonitoringTool.Field;

public record GetFieldResponse
{
    public Guid Id { get; set; }

    public required string Content { get; set; }
}