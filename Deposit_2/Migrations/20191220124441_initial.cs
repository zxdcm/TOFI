using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Deposit_2.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    TempPassword = table.Column<string>(nullable: true),
                    TempPasswordValidTillDate = table.Column<DateTime>(nullable: false),
                    Email = table.Column<string>(nullable: true),
                    FiltersConfig = table.Column<string>(nullable: true),
                    ProfileConfig = table.Column<string>(nullable: true),
                    BlockExpires = table.Column<DateTime>(nullable: false),
                    FailedAuthRetryCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
