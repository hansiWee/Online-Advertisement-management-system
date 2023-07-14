const { getDesc } = require("./Prof.sever");

module.exports = {
  getDesc: (req, res) => {
    const { id_seller } = req.body;
    getDesc(id_seller, (error, results) => {
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

      const Profile = results.map((Profile) => ({
        companyName: Profile.companyName,
        businessAddress: Profile.businessAddress,
        phoneNu: Profile.phoneNu,
        email: Profile.email,
        logo: `http://localhost:3000/${Profile.logo}`, // Include the photo URL
      }));

      // Return the separate JSON objects in the response
      return res.status(200).json({
        success: 1,
        Profile,
      });
    });
  },
};
