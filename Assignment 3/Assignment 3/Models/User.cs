//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Assignment_3.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class User
    {
        public string UserID { get; set; }
        public string Pass { get; set; }
        public Nullable<System.Guid> GUID { get; set; }
        public string SessionID { get; set; }
        public Nullable<System.DateTime> GUIDEXP { get; set; }
        public bool Manager { get; set; }
    }
}
