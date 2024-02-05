import { recipes } from '../../data/recipes.js';
import { RecipeModel } from '../models/recipeModel.js';
import { SearchBarModel } from '../models/searchBarModel.js';
import { TagModel } from '../models/tagModel.js';

class IndexPage {
  async init() {
    // Display search bar and search tag
    new SearchBarModel(recipes).render();
    new TagModel(recipes).render();

    // Display all recipes
    if (recipes) {
      // Generate Recipes Cards
      recipes.forEach((recipe) => {
        const card = new RecipeModel(recipe);
        card.render();
      });
    }
  }
}

new IndexPage().init();
