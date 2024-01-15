import recipes from '../data/recipes.js';
import data from '../data/recipes.js';
import { RecipeModel } from '../models/recipeModel.js';
import { SearchBarModel } from '../models/searchBarModel.js';
import { SearchTagModel } from '../models/searchTagModel.js';

class IndexPage {
  init() {
    // Display search bar and search tag
    new SearchBarModel().render;
    new SearchTagModel(data).render();

    // Display all recipes
    if (data) {
      // Generate Recipes Cards
      data.forEach((recipe) => {
        const card = new RecipeModel(recipe);
        card.render();
      });
    }
  }
}

new IndexPage().init();
