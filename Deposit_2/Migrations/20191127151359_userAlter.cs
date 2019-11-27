using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Deposit_2.Migrations
{
    public partial class userAlter : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "BlockExpires",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "FailedAuthRetryCount",
                table: "Users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ProfileConfig",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BlockExpires",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "FailedAuthRetryCount",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ProfileConfig",
                table: "Users");
        }
    }
}
