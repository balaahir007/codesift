const Product = require("../models/productModels");

exports.createOrUpdateProducts = async (req, res) => {
    const { products } = req.body;
    
      if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "No products to update" });
    }
  
    for (const item of products) {
      if (!item.name || !item.description || !item.quantity) {
        return res.status(400).json({ error: "Product name, description, and quantity are required." });
      }
    }
  
    const updates = products.map((item) => ({
      updateOne: {
        filter: { name: item.name },
        update: {
          $set: {
            description: item.description,
            quantity: item.quantity,
          },
        },
        upsert: true,
      },
    }));
  
    try {
      await Product.bulkWrite(updates);
      res.status(200).json({ message: "Products updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Database error", error: error.message });
    }
  };
  
