﻿using System;
using System.Text;

namespace Program.Helpers;

public class ConsoleHelpers
{
    public static string GetTextSecurely()
    {
        StringBuilder password = new();
        ConsoleKeyInfo key;
        
        do
        {
            key = Console.ReadKey(true);

            if (key.Key != ConsoleKey.Backspace && key.Key != ConsoleKey.Enter)
            {
                password.Append(key.KeyChar);
                Console.Write("*");
            }
            else if (key.Key == ConsoleKey.Backspace && password.Length > 0)
            {
                password.Remove(password.Length - 1, 1);
                Console.Write("\b \b");
            }
        } while (key.Key != ConsoleKey.Enter);

        return password.ToString();
    }
}