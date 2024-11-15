using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Encuestas.Server.Models;

public partial class DbEncuestasContext : DbContext
{
    public DbEncuestasContext()
    {
    }

    public DbEncuestasContext(DbContextOptions<DbEncuestasContext> options)
        : base(options)
    {
    }

    public virtual DbSet<PreguntasE> PreguntasEs { get; set; }

    public virtual DbSet<RespuestasE> RespuestasEs { get; set; }

    public virtual DbSet<TiendasE> TiendasEs { get; set; }

    public virtual DbSet<UsuariosE> UsuariosEs { get; set; }

    public virtual DbSet<VendedoresE> VendedoresEs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PreguntasE>(entity =>
        {
            entity.HasKey(e => e.IdPregunta).HasName("PK__Pregunta__623EEC422BA444BA");

            entity.ToTable("PreguntasE");

            entity.Property(e => e.IdPregunta).HasColumnName("idPregunta");
            entity.Property(e => e.Pregunta)
                .HasMaxLength(120)
                .IsUnicode(false);
        });

        modelBuilder.Entity<RespuestasE>(entity =>
        {
            entity.HasKey(e => e.IdRespuesta).HasName("PK__Respuest__8AB5BFC86ED58FFC");

            entity.ToTable("RespuestasE");

            entity.Property(e => e.IdRespuesta).HasColumnName("idRespuesta");
            entity.Property(e => e.Comentario).IsUnicode(false);
            entity.Property(e => e.Respuesta1)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Respuesta2)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Respuesta3)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Respuesta4)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Respuesta5)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Tienda)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Vendedor)
                .HasMaxLength(32)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TiendasE>(entity =>
        {
            entity.HasKey(e => e.IdTienda).HasName("PK__TiendasE__CF09B22C81D73145");

            entity.ToTable("TiendasE");

            entity.Property(e => e.IdTienda).HasColumnName("idTienda");
            entity.Property(e => e.Tienda)
                .HasMaxLength(16)
                .IsUnicode(false);
        });

        modelBuilder.Entity<UsuariosE>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__Usuarios__645723A6586472AA");

            entity.ToTable("UsuariosE");

            entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");
            entity.Property(e => e.Contrasena)
                .HasMaxLength(32)
                .IsUnicode(false);
            entity.Property(e => e.Rol)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Usuario)
                .HasMaxLength(32)
                .IsUnicode(false);
        });

        modelBuilder.Entity<VendedoresE>(entity =>
        {
            entity.HasKey(e => e.IdVendedor).HasName("PK__Vendedor__A6693F93DBE0D1EA");

            entity.ToTable("VendedoresE");

            entity.Property(e => e.IdVendedor).HasColumnName("idVendedor");
            entity.Property(e => e.ImgVendedor).HasColumnName("imgVendedor");
            entity.Property(e => e.Tienda)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Vendedor)
                .HasMaxLength(32)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
