
const pool= require("../../config/database");

module.exports = {

  createp: (data, photoPaths, callBack) => {
    pool.query(
      'INSERT INTO addproduct (name, price, phone, description, CreateDate, city_id, category_id) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?)',
      [
        data.name,
        data.price,
        data.phone,
        data.description,
        data.city_id,
        data.category_id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
  
        const id_Product = results.insertId;
  
        const insertPhotoQueries = photoPaths.map((photoPath) => {
          return new Promise((resolve, reject) => {
            pool.query(
              'INSERT INTO advertisementphoto (id_Product_fk, photo) VALUES (?, ?)',
              [id_Product, photoPath],
              (error, results, fields) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(results);
                }
              }
            );
          });
        });
  
        Promise.all(insertPhotoQueries)
          .then((results) => {
            callBack(null, results);
          })
          .catch((error) => {
            callBack(error);
          });
      }
    );
  },
  
    getProducts: (callBack) => {
        pool.query(
            'SELECT addproduct.name, addproduct.price, addproduct.phone, city.City_name, categroy.Categroy FROM addproduct INNER JOIN city ON addproduct.city_id = idCity INNER JOIN categroy ON addproduct.category_id = idCategroy ORDER BY addproduct.CreateDate DESC',
  
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      getProductsByCategory: (categoryId, callBack) => {
        pool.query(
          'SELECT addproduct.name, addproduct.price, addproduct.phone, city.City_name, categroy.Categroy FROM addproduct INNER JOIN city ON addproduct.city_id = city.idCity INNER JOIN categroy ON addproduct.category_id = categroy.idCategroy WHERE addproduct.category_id = ?',
          [categoryId],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      deleteProduct: (productId, callBack) => {
        pool.query(
          'DELETE FROM addproduct WHERE id_Product = ?',
          [productId],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      
      updateProduct: (productId, data, callBack) => {
        pool.query(
          'UPDATE addproduct SET name = ?, price = ?, phone = ?, description = ?, city_id = ?, category_id = ? WHERE id_Product = ?',
          [
            data.name,
            data.price,
            data.phone,
            data.description,
            data.city_id,
            data.category_id,
            productId
          ],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
      }
      
      
}  