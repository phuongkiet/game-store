using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class StatusGame : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GameCodeId",
                table: "OrderDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<byte>(
                name: "Status",
                table: "Games",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_GameCodeId",
                table: "OrderDetails",
                column: "GameCodeId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetails_GameCodes_GameCodeId",
                table: "OrderDetails",
                column: "GameCodeId",
                principalTable: "GameCodes",
                principalColumn: "GameCodeId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetails_GameCodes_GameCodeId",
                table: "OrderDetails");

            migrationBuilder.DropIndex(
                name: "IX_OrderDetails_GameCodeId",
                table: "OrderDetails");

            migrationBuilder.DropColumn(
                name: "GameCodeId",
                table: "OrderDetails");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Games");
        }
    }
}
