using System;
using System.Collections.Generic;

namespace Encuestas.Server.Models;

public partial class RespuestasE
{
    public int IdRespuesta { get; set; }

    public DateOnly? Fecha { get; set; }

    public string? Vendedor { get; set; }

    public string? Tienda { get; set; }

    public string? Respuesta1 { get; set; }

    public string? Respuesta2 { get; set; }

    public string? Respuesta3 { get; set; }

    public string? Respuesta4 { get; set; }

    public string? Respuesta5 { get; set; }

    public string? Comentario { get; set; }
}
