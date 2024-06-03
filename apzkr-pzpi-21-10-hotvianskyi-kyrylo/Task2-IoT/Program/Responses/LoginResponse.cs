namespace Program.Responses;

public class LoginResponse : BaseResponse
{
    public string UserId { get; set; } = null!;
    public string Role { get; set; } = null!;
    public string Bearer { get; set; } = null!;
}