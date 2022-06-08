using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MailTracker.Migrations
{
    public partial class RemoveColumnInternalMail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InternalMails_ExternalMails_ExternalMailID",
                table: "InternalMails");

            migrationBuilder.DropIndex(
                name: "IX_InternalMails_ExternalMailID",
                table: "InternalMails");

            migrationBuilder.DropColumn(
                name: "ExternalMailID",
                table: "InternalMails");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ExternalMailID",
                table: "InternalMails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_InternalMails_ExternalMailID",
                table: "InternalMails",
                column: "ExternalMailID");

            migrationBuilder.AddForeignKey(
                name: "FK_InternalMails_ExternalMails_ExternalMailID",
                table: "InternalMails",
                column: "ExternalMailID",
                principalTable: "ExternalMails",
                principalColumn: "ExternalMailID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
