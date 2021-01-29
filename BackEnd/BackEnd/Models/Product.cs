using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BackEnd.Models
{
    public class Product
    {

        [Key]
        public long IdProduct { get; set; }

        [Required]
        [StringLength(100)]
        public string NameProduct { get; set; }

        [Required]
        [StringLength(250)]
        public string DescriptionProduct { get; set; }

        [Required]
        [Range(0, float.MaxValue, ErrorMessage = "Please enter a value bigger than {0}")]
        public float ValueProduct { get; set; }

        public string ImgPath { get; set; }

        [JsonIgnore]
        public virtual ICollection<RequestProduct> RequestProducts { get; set; }
    }
}
