﻿// <auto-generated />
using System;
using Encuestas.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Encuestas.Server.Migrations
{
    [DbContext(typeof(DbEncuestasContext))]
    [Migration("20241009040054_Initial")]
    partial class Initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Encuestas.Server.Models.PreguntasE", b =>
                {
                    b.Property<int>("IdPregunta")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("idPregunta");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdPregunta"));

                    b.Property<string>("Pregunta")
                        .HasMaxLength(120)
                        .IsUnicode(false)
                        .HasColumnType("varchar(120)");

                    b.HasKey("IdPregunta")
                        .HasName("PK__Pregunta__623EEC422BA444BA");

                    b.ToTable("PreguntasE", (string)null);
                });

            modelBuilder.Entity("Encuestas.Server.Models.RespuestasE", b =>
                {
                    b.Property<int>("IdRespuesta")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("idRespuesta");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdRespuesta"));

                    b.Property<string>("Comentario")
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<DateOnly?>("Fecha")
                        .HasColumnType("date");

                    b.Property<string>("Respuesta1")
                        .HasMaxLength(16)
                        .IsUnicode(false)
                        .HasColumnType("varchar(16)");

                    b.Property<string>("Respuesta2")
                        .HasMaxLength(16)
                        .IsUnicode(false)
                        .HasColumnType("varchar(16)");

                    b.Property<string>("Respuesta3")
                        .HasMaxLength(16)
                        .IsUnicode(false)
                        .HasColumnType("varchar(16)");

                    b.Property<string>("Respuesta4")
                        .HasMaxLength(16)
                        .IsUnicode(false)
                        .HasColumnType("varchar(16)");

                    b.Property<string>("Respuesta5")
                        .HasMaxLength(16)
                        .IsUnicode(false)
                        .HasColumnType("varchar(16)");

                    b.Property<string>("Tienda")
                        .HasMaxLength(16)
                        .IsUnicode(false)
                        .HasColumnType("varchar(16)");

                    b.Property<string>("Vendedor")
                        .HasMaxLength(32)
                        .IsUnicode(false)
                        .HasColumnType("varchar(32)");

                    b.HasKey("IdRespuesta")
                        .HasName("PK__Respuest__8AB5BFC86ED58FFC");

                    b.ToTable("RespuestasE", (string)null);
                });

            modelBuilder.Entity("Encuestas.Server.Models.TiendasE", b =>
                {
                    b.Property<int>("IdTienda")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("idTienda");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdTienda"));

                    b.Property<string>("Tienda")
                        .HasMaxLength(16)
                        .IsUnicode(false)
                        .HasColumnType("varchar(16)");

                    b.HasKey("IdTienda")
                        .HasName("PK__TiendasE__CF09B22C81D73145");

                    b.ToTable("TiendasE", (string)null);
                });

            modelBuilder.Entity("Encuestas.Server.Models.UsuariosE", b =>
                {
                    b.Property<int>("IdUsuario")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("idUsuario");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdUsuario"));

                    b.Property<string>("Contrasena")
                        .HasMaxLength(32)
                        .IsUnicode(false)
                        .HasColumnType("varchar(32)");

                    b.Property<string>("Rol")
                        .HasMaxLength(16)
                        .IsUnicode(false)
                        .HasColumnType("varchar(16)");

                    b.Property<string>("Usuario")
                        .HasMaxLength(32)
                        .IsUnicode(false)
                        .HasColumnType("varchar(32)");

                    b.HasKey("IdUsuario")
                        .HasName("PK__Usuarios__645723A6586472AA");

                    b.ToTable("UsuariosE", (string)null);
                });

            modelBuilder.Entity("Encuestas.Server.Models.VendedoresE", b =>
                {
                    b.Property<int>("IdVendedor")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("idVendedor");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdVendedor"));

                    b.Property<string>("ImgVendedor")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("imgVendedor");

                    b.Property<string>("Tienda")
                        .HasMaxLength(16)
                        .IsUnicode(false)
                        .HasColumnType("varchar(16)");

                    b.Property<string>("Vendedor")
                        .HasMaxLength(32)
                        .IsUnicode(false)
                        .HasColumnType("varchar(32)");

                    b.HasKey("IdVendedor")
                        .HasName("PK__Vendedor__A6693F93DBE0D1EA");

                    b.ToTable("VendedoresE", (string)null);
                });
#pragma warning restore 612, 618
        }
    }
}
