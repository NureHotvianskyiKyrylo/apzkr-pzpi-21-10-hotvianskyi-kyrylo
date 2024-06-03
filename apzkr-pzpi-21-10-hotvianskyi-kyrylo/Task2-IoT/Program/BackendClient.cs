using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Program.Commands;
using Program.Responses;

namespace Program;

public class BackendClient
{
    private readonly HttpClient _client = new HttpClient()
    {
        BaseAddress = new Uri("https://localhost:44328/api/v1/"),
    };
    /// <summary>
    /// Login in and get token
    /// </summary>
    /// <param name="loginCommand">Email and password of the user (with "Member" role)</param>
    /// <returns>If all is good, then <see cref="LoginResponse"/> is returned. <see cref="BadRequestResponse"/> is returned in case of validation error. </returns>
    /// <exception cref="Exception">Throws if server exception occured</exception>
    public async Task<BaseResponse> Login(LoginCommand loginCommand)
    {
        var loginResult = await _client.PostAsJsonAsync("auth/login", loginCommand);
        
        switch (loginResult.StatusCode)
        {
            case HttpStatusCode.OK:
                return (await loginResult.Content.ReadFromJsonAsync<LoginResponse>())!;
            case HttpStatusCode.BadRequest:
                return (await loginResult.Content.ReadFromJsonAsync<BadRequestResponse>())!;
            default:
                throw new Exception("Login failed");
        }
    }

    /// <summary>
    /// Create measurement for user with specified token
    /// </summary>
    /// <param name="createMeasurementCommand">Data for creating a measurement</param>
    /// <param name="token">Token of the user (with "Member" role)</param>
    /// <returns>If all is good, then <see cref="BaseResponse"/> is returned. <see cref="BadRequestResponse"/> is returned in case of validation error. </returns>
    /// <exception cref="Exception">Throws if server exception occured</exception>
    public async Task<BaseResponse> CreateMeasurement(CreateMeasurementCommand createMeasurementCommand, string token)
    {
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        
        var createMeasurementResult = await _client.PostAsJsonAsync("measurements", createMeasurementCommand);
        switch (createMeasurementResult.StatusCode)
        {
            case HttpStatusCode.Created:
                return new BaseResponse();
            case HttpStatusCode.BadRequest:
                return (await createMeasurementResult.Content.ReadFromJsonAsync<BadRequestResponse>())!;
            default:
                throw new Exception("Create measurement failed");
        }
    }
}