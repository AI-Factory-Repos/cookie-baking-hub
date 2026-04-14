require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const connectDB = require('../config/db');
const Recipe = require('../models/Recipe');

const recipes = [
  {
    name: 'Chocolate Chip Cookies',
    description:
      'Classic golden cookies loaded with semi-sweet chocolate chips — crispy on the edges and chewy in the center.',
    difficulty: 'easy',
    prep_time: 15,
    bake_time: 11,
    ingredients: [
      '2 1/4 cups all-purpose flour',
      '1 tsp baking soda',
      '1 tsp salt',
      '1 cup (2 sticks) unsalted butter, softened',
      '3/4 cup granulated sugar',
      '3/4 cup packed brown sugar',
      '2 large eggs',
      '2 tsp vanilla extract',
      '2 cups semi-sweet chocolate chips',
    ],
    steps: [
      {
        step_number: 1,
        instruction: 'Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.',
        image_url: null,
      },
      {
        step_number: 2,
        instruction: 'Whisk together flour, baking soda, and salt in a bowl; set aside.',
        image_url: null,
      },
      {
        step_number: 3,
        instruction:
          'Beat butter, granulated sugar, and brown sugar with an electric mixer on medium speed until light and fluffy, about 3 minutes.',
        image_url: null,
      },
      {
        step_number: 4,
        instruction: 'Add eggs one at a time, beating well after each addition. Mix in vanilla extract.',
        image_url: null,
      },
      {
        step_number: 5,
        instruction: 'Gradually mix in the flour mixture on low speed until just combined. Stir in chocolate chips.',
        image_url: null,
      },
      {
        step_number: 6,
        instruction:
          'Drop rounded tablespoons of dough onto prepared baking sheets, spacing 2 inches apart.',
        image_url: null,
      },
      {
        step_number: 7,
        instruction:
          'Bake for 9–11 minutes or until edges are golden. Cool on baking sheet for 5 minutes before transferring to a wire rack.',
        image_url: null,
      },
    ],
    tips: [
      'For thicker cookies, chill the dough for 30 minutes before baking.',
      'Use a mix of milk and dark chocolate chips for extra depth of flavor.',
      'Pull cookies from the oven when the centers still look slightly underdone — they will firm up as they cool.',
    ],
  },
  {
    name: 'Sugar Cookies',
    description:
      'Soft, buttery cut-out sugar cookies with a light vanilla flavor — perfect for decorating with icing.',
    difficulty: 'medium',
    prep_time: 30,
    bake_time: 10,
    ingredients: [
      '2 3/4 cups all-purpose flour',
      '1 tsp baking soda',
      '1/2 tsp baking powder',
      '1/2 tsp salt',
      '1 cup (2 sticks) unsalted butter, softened',
      '1 1/2 cups granulated sugar',
      '1 large egg',
      '1 tsp vanilla extract',
      '1/2 tsp almond extract',
    ],
    steps: [
      {
        step_number: 1,
        instruction: 'Whisk together flour, baking soda, baking powder, and salt; set aside.',
        image_url: null,
      },
      {
        step_number: 2,
        instruction: 'Beat butter and sugar until pale and fluffy, about 3–4 minutes.',
        image_url: null,
      },
      {
        step_number: 3,
        instruction: 'Add egg, vanilla extract, and almond extract; beat until combined.',
        image_url: null,
      },
      {
        step_number: 4,
        instruction: 'Gradually add flour mixture, mixing on low until a soft dough forms.',
        image_url: null,
      },
      {
        step_number: 5,
        instruction:
          'Divide dough in half, flatten into discs, wrap in plastic wrap, and refrigerate for at least 1 hour.',
        image_url: null,
      },
      {
        step_number: 6,
        instruction:
          'Preheat oven to 375°F (190°C). Roll dough to 1/4-inch thickness on a lightly floured surface and cut into shapes.',
        image_url: null,
      },
      {
        step_number: 7,
        instruction:
          'Place on parchment-lined baking sheets and bake 8–10 minutes until edges are just set. Cool completely before decorating.',
        image_url: null,
      },
    ],
    tips: [
      'Chilling the dough is essential — it prevents spreading and keeps shapes sharp.',
      'Roll dough between two sheets of parchment to avoid sticking without adding extra flour.',
      'Decorate with royal icing once completely cooled.',
    ],
  },
  {
    name: 'Oatmeal Raisin Cookies',
    description:
      'Hearty, chewy oatmeal cookies packed with plump raisins and warm cinnamon spice.',
    difficulty: 'easy',
    prep_time: 15,
    bake_time: 12,
    ingredients: [
      '1 1/2 cups all-purpose flour',
      '1 tsp baking soda',
      '1 tsp ground cinnamon',
      '1/2 tsp ground nutmeg',
      '1/2 tsp salt',
      '1 cup (2 sticks) unsalted butter, softened',
      '3/4 cup granulated sugar',
      '3/4 cup packed brown sugar',
      '2 large eggs',
      '1 tsp vanilla extract',
      '3 cups old-fashioned rolled oats',
      '1 1/2 cups raisins',
    ],
    steps: [
      {
        step_number: 1,
        instruction: 'Preheat oven to 350°F (175°C). Line baking sheets with parchment paper.',
        image_url: null,
      },
      {
        step_number: 2,
        instruction: 'Whisk flour, baking soda, cinnamon, nutmeg, and salt together; set aside.',
        image_url: null,
      },
      {
        step_number: 3,
        instruction: 'Beat butter, granulated sugar, and brown sugar until creamy.',
        image_url: null,
      },
      {
        step_number: 4,
        instruction: 'Add eggs and vanilla; beat well.',
        image_url: null,
      },
      {
        step_number: 5,
        instruction: 'Stir in flour mixture until just combined, then fold in oats and raisins.',
        image_url: null,
      },
      {
        step_number: 6,
        instruction:
          'Drop heaping tablespoons of dough onto prepared baking sheets, 2 inches apart.',
        image_url: null,
      },
      {
        step_number: 7,
        instruction:
          'Bake 10–12 minutes until edges are lightly golden. Cool on sheet 5 minutes, then transfer to rack.',
        image_url: null,
      },
    ],
    tips: [
      'Soak raisins in warm water for 10 minutes before using to make them extra plump.',
      'Use old-fashioned oats, not quick oats, for the best chewy texture.',
      'Add 1/2 cup chopped walnuts for a nutty variation.',
    ],
  },
  {
    name: 'Peanut Butter Cookies',
    description:
      'Rich, crumbly peanut butter cookies with the signature crosshatch pattern — a timeless classic.',
    difficulty: 'easy',
    prep_time: 15,
    bake_time: 10,
    ingredients: [
      '1 1/4 cups all-purpose flour',
      '3/4 tsp baking soda',
      '1/4 tsp salt',
      '1/2 cup (1 stick) unsalted butter, softened',
      '1/2 cup granulated sugar, plus extra for rolling',
      '1/2 cup packed brown sugar',
      '1 cup creamy peanut butter',
      '1 large egg',
      '1 tsp vanilla extract',
    ],
    steps: [
      {
        step_number: 1,
        instruction: 'Preheat oven to 350°F (175°C). Line baking sheets with parchment paper.',
        image_url: null,
      },
      {
        step_number: 2,
        instruction: 'Whisk flour, baking soda, and salt in a bowl; set aside.',
        image_url: null,
      },
      {
        step_number: 3,
        instruction:
          'Beat butter, granulated sugar, and brown sugar until light and fluffy, about 3 minutes.',
        image_url: null,
      },
      {
        step_number: 4,
        instruction: 'Add peanut butter, egg, and vanilla extract; beat until smooth.',
        image_url: null,
      },
      {
        step_number: 5,
        instruction: 'Gradually mix in the flour mixture until combined.',
        image_url: null,
      },
      {
        step_number: 6,
        instruction:
          'Roll dough into 1-inch balls, roll in granulated sugar, and place 2 inches apart on prepared sheets.',
        image_url: null,
      },
      {
        step_number: 7,
        instruction:
          'Press a fork into each ball twice to create a crosshatch pattern. Bake 9–11 minutes until set but still soft. Cool on sheet before moving.',
        image_url: null,
      },
    ],
    tips: [
      'Do not overbake — cookies will firm up as they cool.',
      'Chunky peanut butter can be substituted for added texture.',
      'Press a chocolate kiss into the center right after baking for a delicious variation.',
    ],
  },
  {
    name: 'Snickerdoodles',
    description:
      'Soft and pillowy cinnamon-sugar cookies with a slightly tangy flavor from cream of tartar.',
    difficulty: 'easy',
    prep_time: 20,
    bake_time: 10,
    ingredients: [
      '2 3/4 cups all-purpose flour',
      '2 tsp cream of tartar',
      '1 tsp baking soda',
      '1/4 tsp salt',
      '1 cup (2 sticks) unsalted butter, softened',
      '1 1/2 cups granulated sugar',
      '2 large eggs',
      '1 tsp vanilla extract',
      '3 tbsp granulated sugar (for rolling)',
      '1 tbsp ground cinnamon (for rolling)',
    ],
    steps: [
      {
        step_number: 1,
        instruction: 'Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.',
        image_url: null,
      },
      {
        step_number: 2,
        instruction: 'Whisk together flour, cream of tartar, baking soda, and salt; set aside.',
        image_url: null,
      },
      {
        step_number: 3,
        instruction: 'Beat butter and 1 1/2 cups sugar until light and fluffy, about 3 minutes.',
        image_url: null,
      },
      {
        step_number: 4,
        instruction: 'Add eggs and vanilla; beat until combined.',
        image_url: null,
      },
      {
        step_number: 5,
        instruction: 'Gradually add flour mixture, mixing on low until a soft dough forms.',
        image_url: null,
      },
      {
        step_number: 6,
        instruction:
          'Mix 3 tbsp sugar and 1 tbsp cinnamon in a small bowl. Roll dough into 1-inch balls and coat thoroughly in cinnamon-sugar.',
        image_url: null,
      },
      {
        step_number: 7,
        instruction:
          'Place balls 2 inches apart on prepared sheets. Bake 9–11 minutes until edges are set and centers look slightly underdone. Cool on sheet 5 minutes.',
        image_url: null,
      },
    ],
    tips: [
      'Cream of tartar is what gives snickerdoodles their signature tangy flavor — do not skip it.',
      'For thicker cookies, refrigerate the dough balls for 30 minutes before baking.',
      'Be generous with the cinnamon-sugar coating for the best flavor.',
    ],
  },
];

async function seed() {
  await connectDB();

  await Recipe.deleteMany({});
  console.log('Existing recipes cleared.');

  const inserted = await Recipe.insertMany(recipes);
  console.log(`Seeded ${inserted.length} recipes successfully:`);
  inserted.forEach((r) => console.log(`  - ${r.name} (${r._id})`));

  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
