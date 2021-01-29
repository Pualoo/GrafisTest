using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BackEnd.Models
{
    public class RequestProduct
    {
        [Key, Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long IdProduct { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Key, Column(Order = 2)]
        public long IdRequest { get; set; }

        [Range(1, float.MaxValue, ErrorMessage = "Please enter a value bigger than {1}")]
        public int QuantityProduct { get; set; }
        [JsonIgnore]
        public Product Product { get; set; }

        [JsonIgnore]
        public Request Request { get; set; }
    }
}
