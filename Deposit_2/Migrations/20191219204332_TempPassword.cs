﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Deposit_2.Migrations
{
    public partial class TempPassword : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TempPassword",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "TempPasswordValidTillDate",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TempPassword",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TempPasswordValidTillDate",
                table: "Users");
        }
    }
}
