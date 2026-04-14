const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema(
  {
    step_number: { type: Number, required: true },
    instruction: { type: String, required: true },
    image_url: { type: String, default: null },
  },
  { _id: false }
);

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true,
    },
    prep_time: { type: Number, required: true, min: 0 }, // minutes
    bake_time: { type: Number, required: true, min: 0 }, // minutes
    ingredients: { type: [String], required: true },
    steps: { type: [stepSchema], required: true },
    tips: { type: [String], default: [] },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model('Recipe', recipeSchema);
