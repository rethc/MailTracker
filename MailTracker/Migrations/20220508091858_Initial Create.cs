using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MailTracker.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ExternalMails",
                columns: table => new
                {
                    ExternalMailID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MailType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TrackingNo = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExternalMails", x => x.ExternalMailID);
                });

            migrationBuilder.CreateTable(
                name: "Persons",
                columns: table => new
                {
                    PersonID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PersonName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Persons", x => x.PersonID);
                });

            migrationBuilder.CreateTable(
                name: "Teams",
                columns: table => new
                {
                    TeamID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TeamName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teams", x => x.TeamID);
                });

            migrationBuilder.CreateTable(
                name: "InternalMails",
                columns: table => new
                {
                    InternalMailID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Contents = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    CollectedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    DateCollected = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ExternalMailID = table.Column<int>(type: "int", nullable: false),
                    PersonID = table.Column<int>(type: "int", nullable: false),
                    TeamID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InternalMails", x => x.InternalMailID);
                    table.ForeignKey(
                        name: "FK_InternalMails_ExternalMails_ExternalMailID",
                        column: x => x.ExternalMailID,
                        principalTable: "ExternalMails",
                        principalColumn: "ExternalMailID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InternalMails_Persons_PersonID",
                        column: x => x.PersonID,
                        principalTable: "Persons",
                        principalColumn: "PersonID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InternalMails_Teams_TeamID",
                        column: x => x.TeamID,
                        principalTable: "Teams",
                        principalColumn: "TeamID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InternalMails_ExternalMailID",
                table: "InternalMails",
                column: "ExternalMailID");

            migrationBuilder.CreateIndex(
                name: "IX_InternalMails_PersonID",
                table: "InternalMails",
                column: "PersonID");

            migrationBuilder.CreateIndex(
                name: "IX_InternalMails_TeamID",
                table: "InternalMails",
                column: "TeamID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InternalMails");

            migrationBuilder.DropTable(
                name: "ExternalMails");

            migrationBuilder.DropTable(
                name: "Persons");

            migrationBuilder.DropTable(
                name: "Teams");
        }
    }
}
