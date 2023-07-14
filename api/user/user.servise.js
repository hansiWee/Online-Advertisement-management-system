
const pool= require("../../config/database");

module.exports = {

    create:(data ,photoPath, callBack)=>{
        pool.query(
            'insert into accountdetails (name, phoneNu, email, password, nicNu, bussinessAddress, companyName, gender,logo) values (?,?,?,?,?,?,?,?,?)',
            [
                data.name,
                data.phoneNu,
                data.email,
                data.password,
                data.nicNu,
                data.bussinessAddress,
                data.companyName,
                data.gender,
                photoPath
            ],
            (error,results,fields)=>{
                if(error)
                {
                   return callBack(error)
                }
                return callBack(null,results)
            }

        );
    },
    getUser: (email, password, callBack)  => {
        pool.query(
          `SELECT a.companyName, a.logo, p.name, p.price, p.phone, p.description, p.CreateDate, p.city_id, p.category_id, adp.photo
     FROM accountdetails AS a
     JOIN addproduct AS p ON a.id_seller = p.sellerID
     LEFT JOIN advertisementphoto AS adp ON p.id_Product = adp.id_Product_fk
     WHERE a.email = ? AND a.password = ?`,
          [email, password],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      getAllCategories: (callBack) => {
        pool.query("SELECT Categroy,idCategroy FROM categroy ", (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        });
      },
      
    

}