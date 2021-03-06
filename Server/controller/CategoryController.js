const Category = require("./models/Category");

class CategoryRouter {
  async getCategories(req, res, next) {
    try {
      const categories = await Category.find();
      res.json({
        success: true,
        data: categories,
      });
    } catch (err) {
      res.json({
        success: false,
        error: err,
      });
    }
  }

  async getCategory(req, res, next) {
    const { categoryId } = req.params;
    try {
      const category = await Category.findById(categoryId);
      res.json({
        success: true,
        data: category,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err,
      });
    }
  }

  async postCategory(req, res, next) {
    var category = req.body;
    if (category.name) category.name = category.name.toLowerCase();
    try {
      let check = await Category.findOne({ name: category.name });
      if (check) {
        res.status(400).json({
          success: false,
          message: "categories exists",
        });
      } else {
        await Category.create(category);

        res.json({
          success: true,
          data: await Category.findOne({ name: category.name }),
        });
      }
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err,
      });
      console.log(err);
    }
  }

  async putCategory(req, res, next) {
    const updatedFields = req.body;
    const { categoryId } = req.params;
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        updatedFields,
        { new: true }
      );
      res.json({
        success: true,
        data: updatedCategory,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err,
      });
    }
  }

  async deleteCategory(req, res, next) {
    const { categoryId } = req.params;
    try {
      await Category.findByIdAndDelete(categoryId);
      res.json({
        success: true,
        message: "Delete successfully",
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err,
      });
    }
  }

  // async deleteAllCategory(req, res, next) {
  //   try {
  //     const categories = await Category.find();
  //     categories.map(async (x) => {
  //       await Category.findByIdAndDelete(x._id);
  //     });

  //     res.json({
  //       success: true,
  //       message: "Delete all successfully",
  //     });
  //   } catch (err) {
  //     res.status(400).json({
  //       success: false,
  //       error: err,
  //     });
  //   }
  // }
}

module.exports = new CategoryRouter();
