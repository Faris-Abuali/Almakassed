using Makassed.Api.Models.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Makassed.Api.Data;

public class MakassedDbContext : IdentityDbContext<MakassedUser>
{
    public MakassedDbContext(DbContextOptions<MakassedDbContext> options) : base(options)
    {
    }

    public DbSet<Chapter> Chapters { get; set; } = null!;
    public DbSet<Policy> Policies { get; set; } = null!;
    public DbSet<Dependency> Dependencies { get; set; } = null!;

    public DbSet<MonitoringTool> MonitoringTools { get; set; } = null!;
    public DbSet<Field> Fields { get; set; } = null!;
    public DbSet<Department> Departments { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Customize the Identity tables names
        builder.Entity<MakassedUser>().ToTable("Users");
        builder.Entity<IdentityRole>().ToTable("Roles");
        builder.Entity<IdentityUserClaim<string>>().ToTable("UserClaims");
        builder.Entity<IdentityUserRole<string>>().ToTable("UserRoles");
        builder.Entity<IdentityUserLogin<string>>().ToTable("UserLogins");
        builder.Entity<IdentityUserToken<string>>().ToTable("UserTokens");
        builder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaims");

        builder.Entity<MonitoringToolFocalPoints>()
            .HasKey(mf => new { mf.MonitoringToolId, mf.FocalPointId });

        builder.Entity<Submission>()
            .HasOne(s => s.MonitoringToolFocalPoints)
            .WithMany(mf => mf.Submissions);

        //builder.Entity<Department>()
        //    .HasOne(d => d.Head)
        //    .WithOne()
        //    .HasForeignKey<MakassedUser>(u => u.Id);

        builder.Entity<Department>()
            .HasOne(d => d.Head)
            .WithOne();
            //.HasForeignKey<MakassedUser>(u => u.Id);

        builder.Entity<MonitoringTool>()
            .HasMany(m => m.FocalPoints)
            .WithMany(f => f.MonitoringTools)
            .UsingEntity<MonitoringToolFocalPoints>();

        builder.Entity<MonitoringTool>()
            .HasMany(m => m.Fields)
            .WithMany(f => f.MonitoringTools)
            .UsingEntity<MonitoringToolFields>();

        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
