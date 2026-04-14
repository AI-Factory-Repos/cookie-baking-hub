require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Recipe = require('../models/Recipe');

const recipes = [
  {
    title: 'Classic Chocolate Chip Cookies',
    description: 'The quintessential chocolate chip cookie — crispy edges, chewy center, loaded with chocolate chips.',
    prepTime: 15,
    cookTime: 11,
    servings: 48,
    difficulty: 'Easy',
    steps: [
      {
        stepNumber: 1,
        instruction: 'Preheat your oven to 375°F (190°C). Measure out all ingredients before you begin.',
        imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80'
      },
      {
        stepNumber: 2,
        instruction: 'In a large bowl, whisk together 2 1/4 cups all-purpose flour, 1 tsp baking soda, and 1 tsp salt. Set aside.',
        imageUrl: 'https://images.unsplash.com/photo-1612201803935-bc31b29f9b14?w=800&q=80'
      },
      {
        stepNumber: 3,
        instruction: 'Beat 1 cup softened butter with 3/4 cup granulated sugar and 3/4 cup packed brown sugar until light and fluffy, about 3–4 minutes.',
        imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80'
      },
      {
        stepNumber: 4,
        instruction: 'Add 2 large eggs one at a time, beating well after each addition. Mix in 2 tsp vanilla extract.',
        imageUrl: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=800&q=80'
      },
      {
        stepNumber: 5,
        instruction: 'Gradually blend the flour mixture into the butter mixture, stirring just until combined. Fold in 2 cups chocolate chips.',
        imageUrl: 'https://images.unsplash.com/photo-1590080876351-41429d46ffd5?w=800&q=80'
      },
      {
        stepNumber: 6,
        instruction: 'Drop rounded tablespoons of dough onto ungreased baking sheets, spacing them 2 inches apart.',
        imageUrl: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&q=80'
      },
      {
        stepNumber: 7,
        instruction: 'Bake for 9–11 minutes or until golden brown. Cool on baking sheets for 2 minutes before transferring to wire racks.',
        imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80'
      }
    ]
  },
  {
    title: 'Snickerdoodle Cookies',
    description: 'Soft and chewy cookies rolled in cinnamon sugar with a signature tangy flavor from cream of tartar.',
    prepTime: 20,
    cookTime: 10,
    servings: 36,
    difficulty: 'Easy',
    steps: [
      {
        stepNumber: 1,
        instruction: 'Preheat oven to 375°F (190°C). Line baking sheets with parchment paper. Measure all ingredients.',
        imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80'
      },
      {
        stepNumber: 2,
        instruction: 'Whisk together 2 3/4 cups flour, 2 tsp cream of tartar, 1 tsp baking soda, and 1/4 tsp salt in a bowl.',
        imageUrl: 'https://images.unsplash.com/photo-1612201803935-bc31b29f9b14?w=800&q=80'
      },
      {
        stepNumber: 3,
        instruction: 'Cream 1 cup softened butter and 1 1/2 cups sugar together until pale and fluffy, about 4 minutes.',
        imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80'
      },
      {
        stepNumber: 4,
        instruction: 'Beat in 2 eggs until fully incorporated. Gradually mix in the flour mixture until a soft dough forms.',
        imageUrl: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=800&q=80'
      },
      {
        stepNumber: 5,
        instruction: 'Mix 3 tbsp sugar with 1 tbsp cinnamon in a small bowl to make the coating.',
        imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80'
      },
      {
        stepNumber: 6,
        instruction: 'Roll dough into 1-inch balls, then roll each ball in the cinnamon-sugar mixture to coat evenly. Place on prepared baking sheets.',
        imageUrl: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&q=80'
      },
      {
        stepNumber: 7,
        instruction: 'Bake for 8–10 minutes until set but still soft. Do not overbake — centers should look slightly underdone. Cool on a wire rack.',
        imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80'
      }
    ]
  },
  {
    title: 'Double Chocolate Fudge Cookies',
    description: 'Rich, fudgy cookies packed with cocoa and chocolate chunks for the ultimate chocolate lover.',
    prepTime: 15,
    cookTime: 12,
    servings: 30,
    difficulty: 'Medium',
    steps: [
      {
        stepNumber: 1,
        instruction: 'Preheat oven to 350°F (175°C). Line two baking sheets with parchment paper. Gather and measure all ingredients.',
        imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80'
      },
      {
        stepNumber: 2,
        instruction: 'Sift together 1 cup flour, 1/2 cup unsweetened cocoa powder, 1 tsp baking powder, and 1/4 tsp salt into a bowl.',
        imageUrl: 'https://images.unsplash.com/photo-1612201803935-bc31b29f9b14?w=800&q=80'
      },
      {
        stepNumber: 3,
        instruction: 'Melt 8 oz dark chocolate with 1/2 cup butter in a heatproof bowl over simmering water, stirring until smooth. Let cool slightly.',
        imageUrl: 'https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=800&q=80'
      },
      {
        stepNumber: 4,
        instruction: 'Whisk 1 1/2 cups sugar and 3 eggs into the cooled chocolate mixture until well combined and slightly thickened.',
        imageUrl: 'https://images.unsplash.com/photo-1590080876351-41429d46ffd5?w=800&q=80'
      },
      {
        stepNumber: 5,
        instruction: 'Fold the dry ingredients into the chocolate mixture until just combined. Stir in 1 cup chocolate chunks.',
        imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80'
      },
      {
        stepNumber: 6,
        instruction: 'Scoop heaped tablespoons of batter onto prepared sheets, spacing 2 inches apart. The batter will be thick and fudgy.',
        imageUrl: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&q=80'
      },
      {
        stepNumber: 7,
        instruction: 'Bake for 10–12 minutes until the tops are crackled and set but the centers are still soft. Cool completely on the pan.',
        imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80'
      }
    ]
  },
  {
    title: 'Oatmeal Raisin Cookies',
    description: 'Hearty, chewy cookies with rolled oats, plump raisins, and warm cinnamon spice.',
    prepTime: 15,
    cookTime: 11,
    servings: 48,
    difficulty: 'Easy',
    steps: [
      {
        stepNumber: 1,
        instruction: 'Preheat oven to 350°F (175°C). Soak 1 1/2 cups raisins in warm water for 10 minutes to plump them, then drain.',
        imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80'
      },
      {
        stepNumber: 2,
        instruction: 'Whisk together 1 1/2 cups flour, 1 tsp baking soda, 1 tsp cinnamon, 1/2 tsp nutmeg, and 1/2 tsp salt.',
        imageUrl: 'https://images.unsplash.com/photo-1612201803935-bc31b29f9b14?w=800&q=80'
      },
      {
        stepNumber: 3,
        instruction: 'Beat 1 cup softened butter, 1 cup brown sugar, and 1/2 cup granulated sugar until light and creamy, about 3 minutes.',
        imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80'
      },
      {
        stepNumber: 4,
        instruction: 'Add 2 eggs and 1 tsp vanilla extract to the butter mixture, beating until smooth and fully combined.',
        imageUrl: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=800&q=80'
      },
      {
        stepNumber: 5,
        instruction: 'Stir in the flour mixture until just combined, then fold in 3 cups old-fashioned rolled oats and the drained raisins.',
        imageUrl: 'https://images.unsplash.com/photo-1590080876351-41429d46ffd5?w=800&q=80'
      },
      {
        stepNumber: 6,
        instruction: 'Drop rounded tablespoons of dough onto ungreased baking sheets, pressing each mound down slightly with your palm.',
        imageUrl: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&q=80'
      },
      {
        stepNumber: 7,
        instruction: 'Bake for 9–11 minutes until the edges are golden but centers still look soft. Cool on baking sheet for 5 minutes before moving.',
        imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80'
      }
    ]
  },
  {
    title: 'Sugar Cookies with Royal Icing',
    description: 'Perfectly crisp cut-out sugar cookies decorated with smooth royal icing — ideal for any occasion.',
    prepTime: 45,
    cookTime: 10,
    servings: 36,
    difficulty: 'Hard',
    steps: [
      {
        stepNumber: 1,
        instruction: 'Whisk together 3 cups flour, 1 tsp baking powder, and 1/2 tsp salt. Measure all remaining ingredients.',
        imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80'
      },
      {
        stepNumber: 2,
        instruction: 'Beat 1 cup softened butter and 1 cup sugar until pale and fluffy. Mix in 1 egg, 1 tsp vanilla, and 1 tsp almond extract.',
        imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80'
      },
      {
        stepNumber: 3,
        instruction: 'Gradually blend in the flour mixture until a smooth dough forms. Divide into two discs, wrap in plastic wrap, and refrigerate for at least 1 hour.',
        imageUrl: 'https://images.unsplash.com/photo-1590080876351-41429d46ffd5?w=800&q=80'
      },
      {
        stepNumber: 4,
        instruction: 'Preheat oven to 375°F (190°C). On a lightly floured surface, roll dough to 1/4-inch thickness.',
        imageUrl: 'https://images.unsplash.com/photo-1612201803935-bc31b29f9b14?w=800&q=80'
      },
      {
        stepNumber: 5,
        instruction: 'Cut out shapes using cookie cutters and place on parchment-lined baking sheets, spacing 1 inch apart.',
        imageUrl: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&q=80'
      },
      {
        stepNumber: 6,
        instruction: 'Bake for 8–10 minutes until edges are just barely golden. Cool completely on a wire rack before decorating.',
        imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80'
      },
      {
        stepNumber: 7,
        instruction: 'Make royal icing by whisking 3 cups powdered sugar, 2 tbsp meringue powder, and 4–5 tbsp water until smooth and glossy. Pipe or spread onto cooled cookies and let set.',
        imageUrl: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=800&q=80'
      }
    ]
  }
];

async function seedDB() {
  try {
    await connectDB();
    await Recipe.deleteMany({});
    console.log('Existing recipes cleared.');
    await Recipe.insertMany(recipes);
    console.log(`Successfully seeded ${recipes.length} recipes with stock photo URLs.`);
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.');
  }
}

seedDB();
