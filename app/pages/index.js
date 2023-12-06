import recipes from '../data/recipes.js';
import data from '../data/recipes.js';
import { RecipeModel } from '../models/recipeModel.js';
import { SearchBarModel } from '../models/searchBarModel.js';
import { SearchTagModel } from '../models/searchTagModel.js';

class IndexPage {
  displaySearchBar() {
    const searchBar = new SearchBarModel();
    searchBar.render();
  }

  displaySearchTag(recipes) {
    const searchTag = new SearchTagModel(recipes);
    searchTag.render();
  }

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
    // Display search bar and search tag
    this.displaySearchBar();
    this.displaySearchTag(data);

    // Display all recipes
    this.displayIndexData(data);
  }
}

const indexPage = new IndexPage();
indexPage.init();
