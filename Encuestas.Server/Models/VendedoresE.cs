using System;
using System.Collections.Generic;

namespace Encuestas.Server.Models;

public partial class VendedoresE
{
    public int IdVendedor { get; set; }

    public string? Vendedor { get; set; }

    public string? Tienda { get; set; }

    //public byte[]? ImgVendedor { get; set; } // Este es para almacenar los bytes

    public string? ImgVendedor { get; set; }
}
