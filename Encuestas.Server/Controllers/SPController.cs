using Encuestas.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Numerics;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Encuestas.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SPController : ControllerBase
    {
        private readonly DbEncuestasContext _context;

        public SPController(DbEncuestasContext context)
        {
            _context = context;
        }

        [HttpPost("Login")]
        public IActionResult Login(UsuariosE gestor)
        {
            if (string.IsNullOrEmpty(gestor.Usuario) || string.IsNullOrEmpty(gestor.Contrasena))
            {
                return BadRequest("Usuario y Contraseña son requeridos");
            }

            try
            {
                using var conexion = (SqlConnection)_context.Database.GetDbConnection();
                using var comand = conexion.CreateCommand();
                conexion.Open();

                comand.CommandType = CommandType.StoredProcedure;
                comand.CommandText = "usp_Login";
                comand.Parameters.Add("@Usuario", SqlDbType.VarChar).Value = gestor.Usuario;
                comand.Parameters.Add("@Contrasena", SqlDbType.VarChar).Value = gestor.Contrasena;

                // Agregar parámetros de salida
                var outputParameter = comand.Parameters.Add("@IsValid", SqlDbType.Bit);
                outputParameter.Direction = ParameterDirection.Output;
                var roleParameter = comand.Parameters.Add("@Rol", SqlDbType.VarChar, 50);
                roleParameter.Direction = ParameterDirection.Output;
                var userParameter = comand.Parameters.Add("@UsuarioOutput", SqlDbType.VarChar, 50);
                userParameter.Direction = ParameterDirection.Output;
                var idUserParameter = comand.Parameters.Add("@UsuarioId", SqlDbType.Int);
                idUserParameter.Direction = ParameterDirection.Output;

                comand.ExecuteNonQuery();

                // Obtener los resultados
                bool isValid = (bool)outputParameter.Value;
                string? rol = roleParameter.Value.ToString();
                string? usuario = userParameter.Value.ToString();
                int? idUser = idUserParameter.Value != DBNull.Value ? Convert.ToInt32(idUserParameter.Value) : (int?)null;

                if (isValid)
                {
                    return Ok(new { message = "Login exitoso", rol, usuario, idUser });
                }
                else
                {
                    return Unauthorized(new { message = "Credenciales inválidas" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }

        [HttpGet("MostrarTiendas")]
        public IActionResult MostrarTiendas()
        {
            try
            {
                List<TiendasE> tiendas = [];

                using (var conexion = (SqlConnection)_context.Database.GetDbConnection())
                {
                    using (var comando = conexion.CreateCommand())
                    {
                        comando.CommandType = System.Data.CommandType.StoredProcedure;
                        comando.CommandText = "usp_MostrarTiendas";

                        conexion.Open();
                        using (SqlDataReader reader = comando.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                while (reader.Read())
                                {
                                    tiendas.Add(new TiendasE
                                    {
                                        IdTienda = reader.GetInt32(reader.GetOrdinal("idTienda")),
                                        Tienda = reader.GetString(reader.GetOrdinal("Tienda"))
                                    });
                                }
                            }
                        }
                    }
                }

                return Ok(tiendas);
            }
            catch (SqlException ex)
            {
                // Log the error
                return StatusCode(500, "Error de base de datos: " + ex.Message);
            }
            catch (Exception ex)
            {
                // Log the error
                return StatusCode(500, "Error inesperado: " + ex.Message);
            }
        }

        [HttpPost("IngresarVendedor")]
        public async Task<IActionResult> IngresarVendedor([FromBody] VendedoresE gestor)
        {
            if (gestor == null)
                return BadRequest("Datos del vendedor inválidos");

            try
            {
                await using var conexion = (SqlConnection)_context.Database.GetDbConnection();
                await conexion.OpenAsync();

                await using var command = conexion.CreateCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "usp_IngresarVendedor";

                command.Parameters.Add("@Vendedor", SqlDbType.VarChar).Value = gestor.Vendedor;
                command.Parameters.Add("@Tienda", SqlDbType.VarChar).Value = gestor.Tienda;

                // Convertir la cadena Base64 a bytes
                if (!string.IsNullOrEmpty(gestor.ImgVendedor))
                {
                    byte[] imgBytes = Convert.FromBase64String(gestor.ImgVendedor);
                    command.Parameters.Add("@ImgVendedor", SqlDbType.VarBinary).Value = imgBytes;
                }
                else
                {
                    command.Parameters.Add("@ImgVendedor", SqlDbType.VarBinary).Value = DBNull.Value;
                }

                await command.ExecuteNonQueryAsync();
                return Ok("Vendedor agregado con éxito");
            }
            catch (FormatException)
            {
                return BadRequest("La cadena de imagen Base64 no es válida.");
            }
            catch (SqlException ex)
            {
                // Log the exception
                return StatusCode(500, $"Error en la base de datos: {ex.Message}");
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, $"Error del servidor: {ex.Message}");
            }
        }

        [HttpGet("MostrarVendedores")]
        public IActionResult MostrarVendedores()
        {
            try
            {
                List<VendedoresE> vendedores = new List<VendedoresE>();
                using (var conexion = (SqlConnection)_context.Database.GetDbConnection())
                {
                    using (var comando = conexion.CreateCommand())
                    {
                        conexion.Open();
                        comando.CommandType = System.Data.CommandType.StoredProcedure;
                        comando.CommandText = "usp_MostrarVendedores";
                        using (SqlDataReader reader = comando.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                while (reader.Read())
                                {
                                    string? imgVendedor = null;
                                    if (!reader.IsDBNull(reader.GetOrdinal("imgVendedor")))
                                    {
                                        byte[] imgData = (byte[])reader["imgVendedor"];
                                        imgVendedor = Convert.ToBase64String(imgData);
                                    }

                                    vendedores.Add(new VendedoresE
                                    {
                                        IdVendedor = reader.GetInt32(reader.GetOrdinal("idVendedor")),
                                        Vendedor = reader["Vendedor"].ToString(),
                                        Tienda = reader["Tienda"].ToString(),
                                        ImgVendedor = imgVendedor
                                    });
                                }
                            }
                        }
                    }
                }
                return Ok(vendedores);
            }
            catch (SqlException ex)
            {
                // Log the error
                return StatusCode(500, "Error de base de datos: " + ex.Message);
            }
            catch (Exception ex)
            {
                // Log the error
                return StatusCode(500, "Error inesperado: " + ex.Message);
            }
        }

        [HttpPost("MostrarVendedoresTienda")]
        public IActionResult MostrarVendedoresTienda([FromBody] TiendasE gestor)
        {
            try
            {
                List<VendedoresE> vendedores = new List<VendedoresE>();
                using (var conexion = (SqlConnection)_context.Database.GetDbConnection())
                {
                    using (var comando = conexion.CreateCommand())
                    {
                        conexion.Open();
                        comando.CommandType = System.Data.CommandType.StoredProcedure;
                        comando.CommandText = "usp_MostrarVendedoresTienda";
                        comando.Parameters.Add("@Tienda", SqlDbType.VarChar).Value = gestor.Tienda;
                        using (SqlDataReader reader = comando.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                while (reader.Read())
                                {
                                    string? imgVendedor = null;
                                    if (!reader.IsDBNull(reader.GetOrdinal("imgVendedor")))
                                    {
                                        byte[] imgData = (byte[])reader["imgVendedor"];
                                        imgVendedor = Convert.ToBase64String(imgData);
                                    }

                                    vendedores.Add(new VendedoresE
                                    {
                                        IdVendedor = reader.GetInt32(reader.GetOrdinal("idVendedor")),
                                        Vendedor = reader.GetString(reader.GetOrdinal("vendedor")),
                                        ImgVendedor = imgVendedor
                                    });
                                }
                            }
                        }
                    }
                }
                return Ok(vendedores);
            }
            catch (SqlException ex)
            {
                return StatusCode(500, "Error de base de datos: " + ex.Message);
            }
            catch (Exception ex)
            {
                // Log the error
                return StatusCode(500, "Error inesperado: " + ex.Message);
            }
        }

        [HttpPost("EliminarVendedor")]
        public IActionResult EliminarVendedor(VendedoresE gestor)
        {
            try
            {
                using (SqlConnection conexion = (SqlConnection)_context.Database.GetDbConnection())
                {
                    using (SqlCommand command = conexion.CreateCommand())
                    {
                        conexion.Open();
                        command.CommandType = CommandType.StoredProcedure;
                        command.CommandText = "usp_EliminarVendedor";
                        command.Parameters.Add("@idVendedor", SqlDbType.Int).Value = gestor.IdVendedor;
                        command.ExecuteNonQuery();
                    }
                }
                return Ok("Vendedor eliminado");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error del servidor: {ex.Message}");
            }
        }

        [HttpPost("IngresarRespuesta")]
        public async Task<IActionResult> IngresarRespuesta([FromBody] RespuestasE gestor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await using var conexion = _context.Database.GetDbConnection() as SqlConnection;
                if (conexion == null)
                {
                    return StatusCode(500, "Error de conexión a la base de datos");
                }

                await conexion.OpenAsync();

                await using var command = conexion.CreateCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "usp_IngresarRespuesta";

                command.Parameters.Add("@Vendedor", SqlDbType.VarChar).Value = gestor.Vendedor ?? (object)DBNull.Value;
                command.Parameters.Add("@Tienda", SqlDbType.VarChar).Value = gestor.Tienda ?? (object)DBNull.Value;
                command.Parameters.Add("@Respuesta1", SqlDbType.VarChar).Value = string.IsNullOrEmpty(gestor.Respuesta1) ? "" : gestor.Respuesta1;
                command.Parameters.Add("@Respuesta2", SqlDbType.VarChar).Value = string.IsNullOrEmpty(gestor.Respuesta2) ? "" : gestor.Respuesta2;
                command.Parameters.Add("@Respuesta3", SqlDbType.VarChar).Value = string.IsNullOrEmpty(gestor.Respuesta3) ? "" : gestor.Respuesta3;
                command.Parameters.Add("@Respuesta4", SqlDbType.VarChar).Value = string.IsNullOrEmpty(gestor.Respuesta4) ? "" : gestor.Respuesta4;
                command.Parameters.Add("@Respuesta5", SqlDbType.VarChar).Value = string.IsNullOrEmpty(gestor.Respuesta5) ? "" : gestor.Respuesta5;
                command.Parameters.Add("@Comentario", SqlDbType.VarChar).Value = string.IsNullOrEmpty(gestor.Comentario) ? "" : gestor.Comentario;

                await command.ExecuteNonQueryAsync();

                return Ok("Respuesta ingresada con éxito");
            }
            catch (SqlException)
            {
                // Log the exception (using a logging framework)
                return StatusCode(500, "Error en la base de datos al ingresar la respuesta");
            }
            catch (Exception)
            {
                // Log the exception (using a logging framework)
                return StatusCode(500, "Error del servidor al ingresar la respuesta");
            }
        }

        [HttpGet("MostrarRespuestas")]
        public IActionResult MostrarRespuestas(DateTime fechaInicio, DateTime fechaFin, string tienda, string vendedor)
        {
            try
            {
                RespuestaModel respuestaModel = new RespuestaModel
                {
                    FechaInicio = fechaInicio,
                    FechaFin = fechaFin,
                    Tienda = tienda,
                    Vendedor = vendedor
                };

                using (var conexion = (SqlConnection)_context.Database.GetDbConnection())
                {
                    using (var comando = conexion.CreateCommand())
                    {
                        comando.CommandType = System.Data.CommandType.StoredProcedure;
                        comando.CommandText = "usp_MostrarRespuestas";

                        comando.Parameters.AddWithValue("@FechaInicio", fechaInicio);
                        comando.Parameters.AddWithValue("@FechaFin", fechaFin);
                        comando.Parameters.AddWithValue("@Tienda", tienda);
                        comando.Parameters.AddWithValue("@Vendedor", vendedor);

                        conexion.Open();
                        using (SqlDataReader reader = comando.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                while (reader.Read())
                                {
                                    respuestaModel.Respuestas.Add(new RespuestasE
                                    {
                                        IdRespuesta = reader.GetInt32(reader.GetOrdinal("idRespuesta")),
                                        Fecha = DateOnly.FromDateTime(reader.GetDateTime(reader.GetOrdinal("Fecha"))),
                                        Tienda = reader.GetString(reader.GetOrdinal("Tienda")),
                                        Vendedor = reader.GetString(reader.GetOrdinal("Vendedor")),
                                        Respuesta1 = reader.GetString(reader.GetOrdinal("Respuesta1")),
                                        Respuesta2 = reader.GetString(reader.GetOrdinal("Respuesta2")),
                                        Respuesta3 = reader.GetString(reader.GetOrdinal("Respuesta3")),
                                        Respuesta4 = reader.GetString(reader.GetOrdinal("Respuesta4")),
                                        Respuesta5 = reader.GetString(reader.GetOrdinal("Respuesta5")),
                                        Comentario = reader.GetString(reader.GetOrdinal("Comentario"))
                                    });
                                }
                            }
                        }
                    }
                }

                return Ok(respuestaModel);
            }
            catch (SqlException ex)
            {
                return StatusCode(500, "Error de base de datos: " + ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error inesperado: " + ex.Message);
            }
        }

        public class RespuestaModel
        {
            public DateTime FechaInicio { get; set; }
            public DateTime FechaFin { get; set; }
            public string? Tienda { get; set; }
            public string? Vendedor { get; set; }
            public List<RespuestasE> Respuestas { get; set; }

            public RespuestaModel()
            {
                Respuestas = new List<RespuestasE>();
            }
        }




    }
}
