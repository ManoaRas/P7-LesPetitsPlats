import { RecipeView } from '../views/recipeView.js';

export class RecipeModel {
  constructor(recipe) {
    const { id, image, name, servings, ingredients, time, description, appliance, ustensils } = recipe;
    this.id = id;
    this.image = image;
    this.name = name;
    this.servings = servings;
    this.ingredients = ingredients;
    this.time = time;
    this.description = description;
    this.appliance = appliance;
    this.ustensils = ustensils;
  }

  render() {
    new RecipeView().displayRecipe(this.id, this.image, this.name, this.time, this.description, this.ingredients);
  }
}
