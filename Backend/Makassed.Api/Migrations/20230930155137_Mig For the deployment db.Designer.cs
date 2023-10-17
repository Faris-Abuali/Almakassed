﻿// <auto-generated />
using System;
using Makassed.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Makassed.Api.Migrations
{
    [DbContext(typeof(MakassedDbContext))]
    [Migration("20230930155137_Mig For the deployment db")]
    partial class MigForthedeploymentdb
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Makassed.Api.Models.Chapter", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("EnableState")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Chapters");
                });

            modelBuilder.Entity("Makassed.Api.Models.Dependency", b =>
                {
                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("DependencyType")
                        .HasColumnType("int");

                    b.Property<Guid>("DependencyTypeId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("EstimatedTime")
                        .HasColumnType("int");

                    b.Property<int>("PagesCount")
                        .HasColumnType("int");

                    b.Property<string>("PdfUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PolicyCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Code");

                    b.HasIndex("PolicyCode");

                    b.ToTable("Dependencies");
                });

            modelBuilder.Entity("Makassed.Api.Models.Policy", b =>
                {
                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(450)");

                    b.Property<Guid>("ChapterId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PdfUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("State")
                        .HasColumnType("bit");

                    b.HasKey("Code");

                    b.HasIndex("ChapterId");

                    b.ToTable("Policies");
                });

            modelBuilder.Entity("Makassed.Api.Models.Dependency", b =>
                {
                    b.HasOne("Makassed.Api.Models.Policy", "Policy")
                        .WithMany("Dependencies")
                        .HasForeignKey("PolicyCode")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Policy");
                });

            modelBuilder.Entity("Makassed.Api.Models.Policy", b =>
                {
                    b.HasOne("Makassed.Api.Models.Chapter", "Chapter")
                        .WithMany("Policies")
                        .HasForeignKey("ChapterId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Chapter");
                });

            modelBuilder.Entity("Makassed.Api.Models.Chapter", b =>
                {
                    b.Navigation("Policies");
                });

            modelBuilder.Entity("Makassed.Api.Models.Policy", b =>
                {
                    b.Navigation("Dependencies");
                });
#pragma warning restore 612, 618
        }
    }
}
