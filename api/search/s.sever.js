const pool = require('../../config/database');

module.exports = {
  search: (productName, callBack) => {
    pool.query(
      `SELECT addproduct.name, addproduct.price, advertisementphoto.photo, accountdetails.logo, City.City_name
      FROM addproduct
      LEFT JOIN advertisementphoto ON advertisementphoto.id_Product_fk = addproduct.id_Product
      LEFT JOIN accountdetails ON accountdetails.id_seller = addproduct.sellerID
      LEFT JOIN City ON City.idCity = addproduct.city_id
      WHERE addproduct.name LIKE ?`,
      [`%${productName}%`],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  filterByCategory: (categoryID, callBack) => {
    pool.query(
      `SELECT addproduct.name, addproduct.price, advertisementphoto.photo, accountdetails.logo, City.City_name
      FROM addproduct
      LEFT JOIN advertisementphoto ON advertisementphoto.id_Product_fk = addproduct.id_Product
      LEFT JOIN accountdetails ON accountdetails.id_seller = addproduct.sellerID
      LEFT JOIN City ON City.idCity = addproduct.city_id
      WHERE addproduct.category_id = ?`,
      [categoryID],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};
