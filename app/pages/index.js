import data from '../data/recipes.js';
import { RecipeModel } from '../models/recipeModel.js';
// import SearchBarModel from '../models/SearchBarModel.js'

class IndexPage {
  displayIndexData(recipes) {
    if (recipes) {
      // Generate Recipes Cards
      recipes.forEach((recipe) => {
        const card = new RecipeModel(recipe);
        card.render();
      });
    }
  }

  init() {
    // Display all recipes
    this.displayIndexData(data);
  }
}

const indexPage = new IndexPage();
indexPage.init();
