using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using Assignment_3.Models;

namespace Assignment_3.Controllers
{
    public class JandreController : ApiController
    {
        [System.Web.Mvc.Route("api/Jandre/getProducts")]
        [HttpGet]
        public HttpResponseMessage getProducts()
        {
            MyHardwareEntities db = new MyHardwareEntities();
            db.Configuration.ProxyCreationEnabled = false;
            //return getProductReturnList(db.Products.ToList());
            //List<dynamic> productList = new List<dynamic>();
            //dynamic product1 = new ExpandoObject();
            //product1.ID = 1;
            //product1.Desc = "whatever";
            //productList.Add(product1);
            //dynamic product2 = new ExpandoObject();
            //product2.ID = 2;
            //product2.Desc = "whatever ML";
            //productList.Add(product2);
            var response = Request.CreateResponse(HttpStatusCode.OK, getProductReturnList(db.Products.ToList()));
            response.Headers.Add("Access-Control-Allow-Origin", "*");
            return response;
            //return productList;
        }
        private List<dynamic> getProductReturnList(List<Product> forClient)
        {
            List<dynamic> productList = new List<dynamic>();
            foreach (Product prod in forClient)
            {
                dynamic product1 = new ExpandoObject();
                product1.ID = prod.P_CODE;
                product1.Desc = prod.P_DESCRIPT;
                productList.Add(product1);
            }
            return productList;
        }
        [System.Web.Mvc.Route("api/Jandre/getProductsWithVenodrs")]
        [HttpPost]
        public List<dynamic> getProductsWithVenodrs()
        {
            MyHardwareEntities db = new MyHardwareEntities();
            db.Configuration.ProxyCreationEnabled = false;
            List<Product> prods = db.Products.Include(zz => zz.Vendor).ToList();
            return getProductWithVendorReturnList(prods);
        }
        private List<dynamic> getProductWithVendorReturnList(List<Product> forClient)
        {
            List<dynamic> productList = new List<dynamic>();
            foreach (Product prod in forClient)
            {
                dynamic product1 = new ExpandoObject();
                product1.ID = prod.P_CODE;
                product1.Desc = prod.P_DESCRIPT;
                product1.VendorCode = getvendor(prod) ;
                productList.Add(product1);
            }
            return productList;
        }
        private List<dynamic> getvendor(Product prod)
        {
            MyHardwareEntities db = new MyHardwareEntities();
            List<dynamic> dynamicVends = new List<dynamic>();
            var vendors = db.Vendors.Where(o => o.V_CODE == prod.V_CODE).ToList();
            foreach (Vendor vend in vendors)
            {
                dynamic dynamicVend = new ExpandoObject();
                dynamicVend.ID = vend.V_CODE;
                dynamicVend.Name = vend.V_NAME;
                dynamicVends.Add(dynamicVend);
            }
            return dynamicVends;
            
        }
        [System.Web.Mvc.Route("api/Jandre/addProduct")]
        [HttpGet]
        public HttpResponseMessage addProduct([FromUri] Product prod)
        {
            MyHardwareEntities db = new MyHardwareEntities();
            db.Configuration.ProxyCreationEnabled = false;
            db.Products.Add(prod);
            db.SaveChanges();
            return getProducts();
        }
          
    }
}