using Application.Contracts.Persistence;
using Domain;
using Persistence.DatabaseContext;

namespace Persistence.Repositories;

public class PoolEnrollmentRepository : GenericRepository<PoolEnrollmentRequest>, IPoolEnrollmentRepository
{
    public PoolEnrollmentRepository(DataContext context) : base(context)
    {
    }
    
    public Task<IReadOnlyList<PoolEnrollmentRequest>> GetAllByMemberIdAsync(int memberId)
    {
        return GetAllByPredicateAsync(x => x.MemberId == memberId);
    }
}