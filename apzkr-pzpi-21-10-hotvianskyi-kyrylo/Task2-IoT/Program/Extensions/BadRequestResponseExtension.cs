using System;
using Program.Responses;

namespace Program.Extensions;

public static class BadRequestResponseExtension
{
    public static void DisplayErrors(this BadRequestResponse response)
    {
        Console.WriteLine(response.Title);
        
        var responseErrors = response.Errors;
        if (responseErrors is not null)
        {
            foreach (var (key, value) in responseErrors)
            {
                Console.WriteLine($"{key}: {string.Join(", ", value)}");
            }
        }
    }
}