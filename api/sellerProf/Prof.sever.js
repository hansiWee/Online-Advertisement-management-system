const pool = require('../../config/database');

module.exports = {
  getDesc: (id_seller, callBack) => {
    pool.query(
      `SELECT companyName, bussinessAddress, phoneNu, email, logo
       FROM accountdetails
       WHERE id_seller = ?`,
      [id_seller],

      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};
