﻿using Domain.Common;

namespace Domain;

public class Member : BaseEntity
{
    public string IdentityId { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Sex { get; set; }
    public DateOnly DateOfBirth { get; set; }

    public int? PoolId { get; set; }
    public Pool? Pool { get; set; }
    public ICollection<Measurement>? Measurements { get; set; }
}