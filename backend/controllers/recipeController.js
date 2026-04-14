const Recipe = require('../models/Recipe');
const mongoose = require('mongoose');

// GET /api/recipes
const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({}, 'title description category difficulty prepTime cookTime servings image').lean();
    res.json(recipes);
  } catch (err) {
    next(err);
  }
};

// GET /api/recipes/:id
const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid recipe ID format' });
    }

    const recipe = await Recipe.findById(id).lean();

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllRecipes, getRecipeById };
