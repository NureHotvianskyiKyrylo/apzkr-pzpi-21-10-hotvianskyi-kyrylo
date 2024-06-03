using Domain.Common;

namespace Domain;

public class PoolEnrollmentRequest : BaseEntity
{
    public int MemberId { get; set; }
    public int PoolId { get; set; }
    public DateTime EnrollmentDateTime { get; set; }
}