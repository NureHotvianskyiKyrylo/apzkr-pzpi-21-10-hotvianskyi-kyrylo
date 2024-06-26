﻿using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence.Repositories;

namespace Persistence.DatabaseContext;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
        
    }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);
    }
    
    public DbSet<Member> Members { get; set; } = null!;
    public DbSet<Pool> Pools { get; set; } = null!;
    public DbSet<Measurement> Measurements { get; set; } = null!;
    public DbSet<PoolEnrollmentRequest> PoolEnrollmentRequests { get; set; } = null!;
    public DbSet<Recommendation> Recommendations { get; set; } = null!;
}