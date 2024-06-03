﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Persistence.DatabaseContext;

#nullable disable

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20231211135631_Initial")]
    partial class Initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Domain.Gym", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Gyms");
                });

            modelBuilder.Entity("Domain.GymEnrollmentRequest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("GymId")
                        .HasColumnType("integer");

                    b.Property<int>("MemberId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("GymEnrollmentRequests");
                });

            modelBuilder.Entity("Domain.Measurement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<double>("BodyMassIndex")
                        .HasColumnType("double precision");

                    b.Property<DateTime>("DateAndTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<double>("FatPercentage")
                        .HasColumnType("double precision");

                    b.Property<double>("Height")
                        .HasColumnType("double precision");

                    b.Property<double>("LevelOfStress")
                        .HasColumnType("double precision");

                    b.Property<int>("LowerPressure")
                        .HasColumnType("integer");

                    b.Property<int>("MemberId")
                        .HasColumnType("integer");

                    b.Property<double>("MusclePercentage")
                        .HasColumnType("double precision");

                    b.Property<int>("UpperPressure")
                        .HasColumnType("integer");

                    b.Property<double>("Weight")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.HasIndex("MemberId");

                    b.ToTable("Measurements");
                });

            modelBuilder.Entity("Domain.Member", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("DateOfBirth")
                        .HasColumnType("date");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("GymId")
                        .HasColumnType("integer");

                    b.Property<string>("IdentityId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Sex")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("GymId");

                    b.ToTable("Members");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DateOfBirth = new DateOnly(2004, 1, 9),
                            FirstName = "User",
                            IdentityId = "9e224968-33e4-4652-b7b7-8574d048cdb9",
                            LastName = "Userovich",
                            Sex = "Male"
                        });
                });

            modelBuilder.Entity("Persistence.Repositories.Recomendation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Key")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Recomendations");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "Your fat percentage is extremely low. You should eat more healthy food.",
                            Key = "LowFat"
                        },
                        new
                        {
                            Id = 2,
                            Description = "Your fat percentage is great. Continue in the same spirit!",
                            Key = "NormalFat"
                        },
                        new
                        {
                            Id = 3,
                            Description = "Your fat percentage is high. You should do more cardio, balance your diet and drink more water.",
                            Key = "HighFat"
                        },
                        new
                        {
                            Id = 4,
                            Description = "Your muscle percentage is low. You should do more strength exercises with no more than 8 reps per set and eat more protein-containing foods.",
                            Key = "LowMuscle"
                        },
                        new
                        {
                            Id = 5,
                            Description = "Your muscle percentage is great! Continue in the same spirit!",
                            Key = "NormalMuscle"
                        },
                        new
                        {
                            Id = 6,
                            Description = "You are a great fellow, your muscle percentage is really high! But you should visit a doctor and get an ultrasound of the heart, as the heart can be enlarged due to high loads",
                            Key = "HighMuscle"
                        },
                        new
                        {
                            Id = 7,
                            Description = "Your BMI is extremely low! Contact doctor and nutritionist as soon as possible!",
                            Key = "ExtremelyLowBMI"
                        },
                        new
                        {
                            Id = 8,
                            Description = "Your BMI is a bit lower than recommended. You should eat more healthy food and balance your diet.",
                            Key = "LowBMI"
                        },
                        new
                        {
                            Id = 9,
                            Description = "Your BMI is great! Continue in the same spirit!",
                            Key = "NormalBMI"
                        },
                        new
                        {
                            Id = 10,
                            Description = "Your BMI is a bit higher than recommended. You should do more sports and balance your diet.",
                            Key = "HighBMI"
                        },
                        new
                        {
                            Id = 11,
                            Description = "Your BMI is extremely high! Contact nutritionist as soon as possible!",
                            Key = "ExtremelyHighBMI"
                        },
                        new
                        {
                            Id = 12,
                            Description = "Your level of stress is normal. Relax and enjoy you life.",
                            Key = "NormalStress"
                        },
                        new
                        {
                            Id = 13,
                            Description = "Your level of stress is really high! Contact a psychologist.",
                            Key = "HighStress"
                        },
                        new
                        {
                            Id = 14,
                            Description = "Your pressure is low. Don't drink a lot of coffee, do not stand for a long time and contact a doctor.",
                            Key = "LowPressure"
                        },
                        new
                        {
                            Id = 15,
                            Description = "Your pressure is normal.",
                            Key = "NormalPressure"
                        },
                        new
                        {
                            Id = 16,
                            Description = "Your pressure is high. Don't drink a lot of alcohol, don't smoke cigarettes, and refrain from exercising until you consult a doctor.",
                            Key = "HighPressure"
                        });
                });

            modelBuilder.Entity("Domain.Measurement", b =>
                {
                    b.HasOne("Domain.Member", "Member")
                        .WithMany("Measurements")
                        .HasForeignKey("MemberId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Member");
                });

            modelBuilder.Entity("Domain.Member", b =>
                {
                    b.HasOne("Domain.Gym", "Gym")
                        .WithMany("Members")
                        .HasForeignKey("GymId");

                    b.Navigation("Gym");
                });

            modelBuilder.Entity("Domain.Gym", b =>
                {
                    b.Navigation("Members");
                });

            modelBuilder.Entity("Domain.Member", b =>
                {
                    b.Navigation("Measurements");
                });
#pragma warning restore 612, 618
        }
    }
}
