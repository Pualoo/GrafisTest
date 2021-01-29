using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BackEnd.Migrations
{
    public partial class FirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    IdClient = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NameClient = table.Column<string>(type: "nvarchar(70)", maxLength: 70, nullable: false),
                    EmailClient = table.Column<string>(type: "nvarchar(70)", maxLength: 70, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.IdClient);
                    table.UniqueConstraint("UC_Clients", x => x.EmailClient);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    IdProduct = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NameProduct = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DescriptionProduct = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    ValueProduct = table.Column<float>(type: "real", nullable: false),
                    ImgPath = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.IdProduct);
                });

            migrationBuilder.CreateTable(
                name: "Requests",
                columns: table => new
                {
                    IdRequest = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NumberRequest = table.Column<int>(type: "int", nullable: false),
                    DateRequest = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdClient = table.Column<int>(type: "int", nullable: false),
                    ValueRequest = table.Column<float>(type: "real", nullable: false),
                    DiscountRequest = table.Column<float>(type: "real", nullable: false),
                    TotalValue = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Requests", x => x.IdRequest);
                });

            migrationBuilder.CreateTable(
                name: "RequestProducts",
                columns: table => new
                {
                    IdProduct = table.Column<long>(type: "bigint", nullable: false),
                    IdRequest = table.Column<long>(type: "bigint", nullable: false),
                    QuantityProduct = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequestProducts", x => new { x.IdProduct, x.IdRequest });
                    table.ForeignKey(
                        name: "FK_RequestProducts_Products_IdProduct",
                        column: x => x.IdProduct,
                        principalTable: "Products",
                        principalColumn: "IdProduct",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RequestProducts_Requests_IdRequest",
                        column: x => x.IdRequest,
                        principalTable: "Requests",
                        principalColumn: "IdRequest",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RequestProducts_IdRequest",
                table: "RequestProducts",
                column: "IdRequest");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Clients");

            migrationBuilder.DropTable(
                name: "RequestProducts");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Requests");
        }
    }
}
