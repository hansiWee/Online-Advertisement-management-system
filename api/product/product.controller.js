const {  getProducts, deleteProduct, updateProduct, pool } = require("./product.server");



module.exports= {

  createProduct: (req, res) => {
    const body = req.body;
    const photoPaths = req.files.map((file) => file.path); // Get the paths of the uploaded photos
  
    createp(body, photoPaths, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
    
  },
  getProducts: (req, res) => {
        getProducts((error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).json({
              success: 0,
              message: "Internal server error",
            });
          }
          if (results.length === 0) {
            return res.status(404).json({
              success: 0,
              message: "No products found",
            });
          }

          const productsWithPhotoUrl = results.map((product) => ({
            name: product.name,
            price: product.price,
            phone: product.phone,
            photo: product.photo, // Include the photo data
            photoUrl: `http://localhost:3000/${product.photo}`, // Add the photo URL
            city: product.City_name,
            category: product.Categroy,
          }));
      
          return res.status(200).json({
            success: 1,
            data: productsWithPhotoUrl, // Use the updated data with photo URL
          });
        });
      },
      deleteProduct: (req, res) => {
        const { productId } = req.body;
      
        deleteProduct(productId, (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).json({
              success: 0,
              message: "Internal server error",
            });
          }
      
          if (results.affectedRows === 0) {
            return res.status(404).json({
              success: 0,
              message: "Product not found",
            });
          }
      
          return res.status(200).json({
            success: 1,
            message: "Product deleted successfully",
          });
        });
      },
      
        
      updateProduct: (req, res) => {
        const { productId, ...body } = req.body; // Destructure the productId and use the remaining fields as the body
      
        updateProduct(productId, body, (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).json({
              success: 0,
              message: "Internal server error",
            });
          }
      
          if (results.affectedRows === 0) {
            return res.status(404).json({
              success: 0,
              message: "Product not found",
            });
          }
      
          return res.status(200).json({
            success: 1,
            message: "Product updated successfully",
          });
        });
      }
           
      
      
}  