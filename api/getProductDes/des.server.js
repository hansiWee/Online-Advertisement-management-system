const pool = require('../../config/database');

module.exports = {
  getDesc: (idProduct, callBack) => { // Add idProduct parameter
    pool.query(
      `SELECT p.name, p.price, p.phone, p.description, ap.photo
      FROM addproduct AS p
      INNER JOIN advertisementphoto AS ap ON ap.id_Product_fk = p.id_Product
      WHERE p.id_Product = ?`,
      [idProduct], // Pass idProduct as a parameter for the query

      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};
