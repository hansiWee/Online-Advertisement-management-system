const pool = require('../../config/database');

module.exports = {
  getAdvertisements: (callBack) => {
    pool.query(
      'SELECT addproduct.id_Product, addproduct.name, addproduct.price, addproduct.phone, addproduct.description, city.City_name, advertisementphoto.photo, addproduct.sellerID FROM addproduct INNER JOIN city ON addproduct.city_id = city.idCity LEFT JOIN advertisementphoto ON addproduct.id_Product = advertisementphoto.id_Product_fk ORDER BY addproduct.CreateDate DESC',
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        // Transform the results to group photos by advertisement
        const advertisements = results.reduce((acc, product) => {
          const advertisement = acc.find((ad) => ad.id_Product === product.id_Product);

          if (advertisement) {
            if (product.photo) {
              advertisement.photos.push({ photo: product.photo });
            }
          } else {
            const newAdvertisement = {
              id_Product: product.id_Product,
              name: product.name,
              price: product.price,
              phone: product.phone,
              description: product.description,
              City_name: product.City_name,
              sellerId: product.sellerID,
              photos: product.photo ? [{ photo: product.photo }] : []
            };

            acc.push(newAdvertisement);
          }

          return acc;
        }, []);

        return callBack(null, advertisements);
      }
    );
  },
};
