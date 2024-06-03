namespace Application.Features.PoolEnrollment.Queries.Shared;

public class PoolEnrollmentDto
{
    public int Id { get; set; }
    public int MemberId { get; set; }
    public int PoolId { get; set; }
    public DateTime EnrollmentDateTime { get; set; }
}