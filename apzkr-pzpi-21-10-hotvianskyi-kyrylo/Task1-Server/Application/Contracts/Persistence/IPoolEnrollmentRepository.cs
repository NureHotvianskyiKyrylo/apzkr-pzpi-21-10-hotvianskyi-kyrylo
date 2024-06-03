using Domain;

namespace Application.Contracts.Persistence;

public interface IPoolEnrollmentRepository : IGenericRepository<PoolEnrollmentRequest>
{
    Task<IReadOnlyList<PoolEnrollmentRequest>> GetAllByMemberIdAsync(int memberId);
}