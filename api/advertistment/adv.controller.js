const { getAdvertisements } = require("./adv.server");

module.exports = {
  getAdvertisements: (startIndex, maxCount, sellerId, callBack) => {
    getAdvertisements((error, results) => {
      if (error) {
        console.log(error);
        return callBack(error);
      }

      const filteredResults = sellerId
        ? results.filter((product) => product.sellerId === sellerId)
        : results;

      if (filteredResults.length === 0) {
        return callBack(null, [], 0);
      }

      const totalProducts = filteredResults.length;
      const totalPages = Math.ceil(totalProducts / maxCount);

      const actualStartIndex = Math.min(startIndex, totalProducts - maxCount);

      const paginatedResults = filteredResults.slice(
        actualStartIndex,
        actualStartIndex + maxCount
      );

      const advertisements = paginatedResults.map((product) => {
        const photoUrls = product.photos.map(
          (photo) => `http://localhost:3000/${photo.photo}`
        );

        return {
          name: product.name,
          price: product.price,
          phone: product.phone,
          photoUrls: photoUrls,
          city: product.City_name,
        };
      });

      const limitedAdvertisements = advertisements.slice(0, maxCount);

      return callBack(null, limitedAdvertisements, totalPages);
    });
  },
};
