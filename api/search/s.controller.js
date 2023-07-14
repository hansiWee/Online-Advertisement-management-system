const { search, filterByCategory } = require("./s.sever");

module.exports = {
  searchAndFilter: (req, res) => {
    const { productName, categoryID } = req.body;

    if (categoryID && productName) {
      filterByCategory(categoryID, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            success: 0,
            message: "Internal server error",
          });
        }
        const filteredResults = results.filter(
          (product) => product.name.toLowerCase().includes(productName.toLowerCase())
        );
        if (filteredResults.length === 0) {
          return res.status(401).json({
            success: 0,
            message: "No products found in the specified category and with the given name.",
          });
        }

        const profile = filteredResults.map((product) => ({
          name: product.name,
          price: product.price,
          photo: `http://localhost:3000/${product.photo}`, 
          city: product.City_name,
          logo: `http://localhost:3000/${product.logo}`,
        }));

        return res.status(200).json({
          success: 1,
          profile: profile,
        });
      });
    } else if (categoryID) {
      filterByCategory(categoryID, (error, results) => {
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
            message: "No products found in the specified category.",
          });
        }

        const profile = results.map((product) => ({
          name: product.name,
          price: product.price,
          photo: `http://localhost:3000/${product.photo}`, 
          city: product.City_name,
          logo: `http://localhost:3000/${product.logo}`,
        }));

        return res.status(200).json({
          success: 1,
          profile: profile,
        });
      });
    } else if (productName) {
      search(productName, (error, results) => {
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

        const profile = results.map((product) => ({
          name: product.name,
          price: product.price,
          photo: `http://localhost:3000/${product.photo}`, 
          city: product.City_name,
          logo: `http://localhost:3000/${product.logo}`,
        }));

        return res.status(200).json({
          success: 1,
          profile: profile,
        });
      });
    } else {
      return res.status(400).json({
        success: 0,
        message: "Invalid request. Please provide either a productName or categoryID.",
      });
    }
  },
};
