using System;
using System.Collections.Generic;
using System.Text;
using Domain;
using Program.Commands;
using Program.Helpers;

namespace Program.Services;

public class UserService
{
    public LoginCommand GetUser()
    {
        Console.Write("Enter your email: ");
        string email = Console.ReadLine()!;
        Console.Write("Enter your password: ");
        string password = ConsoleHelpers.GetTextSecurely();
        
        Console.WriteLine();
        return new LoginCommand()
        {
            Email = email,
            Password = password.ToString()
        };
    }
}