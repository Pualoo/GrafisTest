using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BackEnd.Models
{
    public class Request
    {
        [Key]
        public long IdRequest { get; set; }

        [Required]
        public int NumberRequest { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime DateRequest { get; set; }

        public virtual ICollection<RequestProduct> RequestProducts { get; set; }

        [Required]
        [ForeignKey("Client")]
        public int IdClient { get; set; }

        [Required]
        [Range(0, float.MaxValue, ErrorMessage = "Please enter a value bigger than {0}")]
        public float ValueRequest { get; set; }

        [Range(0, float.MaxValue, ErrorMessage = "Please enter a value bigger than {0}")]
        public float DiscountRequest { get; set; }

        [Required]
        [Range(0, float.MaxValue, ErrorMessage = "Please enter a value bigger than {0}")]
        public float TotalValue { get; set; }
    }
}
