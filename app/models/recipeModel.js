import { RecipeView } from '../views/recipeView.js';

export class RecipeModel {
  constructor(recipe) {
    const { id, image, name, servings, ingredients, time, description, appliances, ustensils } = recipe;
    this.appliance = appliances;
    this.description = description;
    this.id = id;
    this.ingredients = ingredients;
    this.image = image;
    this.name = name;
    this.servings = servings;
    this.time = time;
    this.ustensils = ustensils;
  }

  render() {
    new RecipeView().displayRecipe(this.id, this.image, this.name, this.time, this.description, this.ingredients);
  }
}
