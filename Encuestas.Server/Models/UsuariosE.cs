using System;
using System.Collections.Generic;

namespace Encuestas.Server.Models;

public partial class UsuariosE
{
    public int IdUsuario { get; set; }

    public string? Usuario { get; set; }

    public string? Contrasena { get; set; }

    public string? Rol { get; set; }
}
