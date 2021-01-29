using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Models
{
    public class Client
    {
        [Key]
        public long IdClient { get; set; }

        [Required]
        [StringLength(70)]
        public string NameClient { get; set; }

        [Required]
        [StringLength(70)]
        [Index("EmailClient_Index", IsUnique = true)]
        public string EmailClient { get; set; }
    }
}
