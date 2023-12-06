import { RecipeView } from '../views/recipeView.js';

export class RecipeModel {
  constructor(recipe) {
    const { id, image, name, servings, ingredients, time, description, applicance, ustensils } = recipe;
    this.id = id;
    this.image = image;
    this.name = name;
    this.servings = servings;
    this.ingredients = ingredients;
    this.time = time;
    this.description = description;
    this.applicance = applicance;
    this.ustensils = ustensils;
  }

  render() {
    const recipeView = new RecipeView();
    recipeView.displayRecipe(this.image, this.name, this.time, this.description, this.ingredients);
  }
}
