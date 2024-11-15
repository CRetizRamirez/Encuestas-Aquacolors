using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Encuestas.Server.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PreguntasE",
                columns: table => new
                {
                    idPregunta = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Pregunta = table.Column<string>(type: "varchar(120)", unicode: false, maxLength: 120, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Pregunta__623EEC422BA444BA", x => x.idPregunta);
                });

            migrationBuilder.CreateTable(
                name: "RespuestasE",
                columns: table => new
                {
                    idRespuesta = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Fecha = table.Column<DateOnly>(type: "date", nullable: true),
                    Vendedor = table.Column<string>(type: "varchar(32)", unicode: false, maxLength: 32, nullable: true),
                    Tienda = table.Column<string>(type: "varchar(16)", unicode: false, maxLength: 16, nullable: true),
                    Respuesta1 = table.Column<string>(type: "varchar(16)", unicode: false, maxLength: 16, nullable: true),
                    Respuesta2 = table.Column<string>(type: "varchar(16)", unicode: false, maxLength: 16, nullable: true),
                    Respuesta3 = table.Column<string>(type: "varchar(16)", unicode: false, maxLength: 16, nullable: true),
                    Respuesta4 = table.Column<string>(type: "varchar(16)", unicode: false, maxLength: 16, nullable: true),
                    Respuesta5 = table.Column<string>(type: "varchar(16)", unicode: false, maxLength: 16, nullable: true),
                    Comentario = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Respuest__8AB5BFC86ED58FFC", x => x.idRespuesta);
                });

            migrationBuilder.CreateTable(
                name: "TiendasE",
                columns: table => new
                {
                    idTienda = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tienda = table.Column<string>(type: "varchar(16)", unicode: false, maxLength: 16, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__TiendasE__CF09B22C81D73145", x => x.idTienda);
                });

            migrationBuilder.CreateTable(
                name: "UsuariosE",
                columns: table => new
                {
                    idUsuario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Usuario = table.Column<string>(type: "varchar(32)", unicode: false, maxLength: 32, nullable: true),
                    Contrasena = table.Column<string>(type: "varchar(32)", unicode: false, maxLength: 32, nullable: true),
                    Rol = table.Column<string>(type: "varchar(16)", unicode: false, maxLength: 16, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Usuarios__645723A6586472AA", x => x.idUsuario);
                });

            migrationBuilder.CreateTable(
                name: "VendedoresE",
                columns: table => new
                {
                    idVendedor = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Vendedor = table.Column<string>(type: "varchar(32)", unicode: false, maxLength: 32, nullable: true),
                    Tienda = table.Column<string>(type: "varchar(16)", unicode: false, maxLength: 16, nullable: true),
                    imgVendedor = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Vendedor__A6693F93DBE0D1EA", x => x.idVendedor);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PreguntasE");

            migrationBuilder.DropTable(
                name: "RespuestasE");

            migrationBuilder.DropTable(
                name: "TiendasE");

            migrationBuilder.DropTable(
                name: "UsuariosE");

            migrationBuilder.DropTable(
                name: "VendedoresE");
        }
    }
}
