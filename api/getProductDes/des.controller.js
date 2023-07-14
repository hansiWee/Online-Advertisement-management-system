const { getDesc } = require("./des.server");

module.exports = {
  getDesc: (req, res) => {
    const { id_Product } = req.body;
    getDesc(id_Product, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: "Internal server error",
        });
      }
      if (results.length === 0) {
        return res.status(401).json({
          success: 0,
          message: "There is no such a product.",
        });
      }

      const products = results.map((product) => ({
        name: product.name,
        price: product.price,
        phone: product.phone,
        description: product.description,
        photo: `http://localhost:3000/${product.photo}`, // Include the photo URL
      }));

      // Return the separate JSON objects in the response
      return res.status(200).json({
        success: 1,
        products,
      });
    });
  },
};
