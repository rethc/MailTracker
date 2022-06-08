using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MailTracker.Migrations
{
    public partial class RemovePersonColumnInternalMail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InternalMails_Persons_PersonID",
                table: "InternalMails");

            migrationBuilder.DropIndex(
                name: "IX_InternalMails_PersonID",
                table: "InternalMails");

            migrationBuilder.DropColumn(
                name: "PersonID",
                table: "InternalMails");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PersonID",
                table: "InternalMails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_InternalMails_PersonID",
                table: "InternalMails",
                column: "PersonID");

            migrationBuilder.AddForeignKey(
                name: "FK_InternalMails_Persons_PersonID",
                table: "InternalMails",
                column: "PersonID",
                principalTable: "Persons",
                principalColumn: "PersonID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
