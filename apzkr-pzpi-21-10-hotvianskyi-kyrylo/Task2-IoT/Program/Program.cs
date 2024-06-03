using System;
using System.Threading;
using System.Threading.Tasks;
using Program.Extensions;
using Program.Responses;
using Program.Services;

namespace Program;

public class Program
{
    // Every 5 seconds the program will create a new measurement with random data
    private const int Timeout = 5000;
    
    public static async Task Main(string[] args)
    {
        BackendClient client = new BackendClient();
        UserService userService = new UserService();
        
        BaseResponse baseResponse = await client.Login(userService.GetUser());
        // If bad request response is returned, then display errors
        if (baseResponse is BadRequestResponse badRequestLoginResponse)
        {
            badRequestLoginResponse.DisplayErrors();
            return;
        }
        
        while(true)
        {
            MeasurementService measurementService = new MeasurementService();
            
            LoginResponse loginResponse = (LoginResponse)baseResponse;
            
            // Send a request to CreateMeasurement endpoint with generated data
            BaseResponse createResponse =
                await client.CreateMeasurement(measurementService.GenerateMeasurement(), loginResponse.Bearer);
            // If bad request response is returned, then display errors
            if (createResponse is BadRequestResponse badRequestCreateResponse)
            {
                badRequestCreateResponse.DisplayErrors();
                continue;
            }

            Console.WriteLine($"Created measurement for user: \"{loginResponse.Role}\"");
            
            Thread.Sleep(Timeout);
        };
    }
}