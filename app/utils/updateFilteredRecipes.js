import { RecipeModel } from "../models/recipeModel";

export class UpdateFilteredRecipes {
  constructor() {
    this.card = document.querySelector('.cards');
    this.countRecipes = document.querySelector('.filter--number');
  }

  _extractFilteredItems(filteredRecipes) {
    const filteredItems = [];
    filteredRecipes.forEach((recipe) => {
        filteredItems.push(normalizeString(recipe.appliance));
        recipe.ustensils.forEach((ustensil) => filteredItems.push(normalizeString(ustensil)));
        recipe.ingredients.forEach((ingredient) => filteredItems.push(normalizeString(ingredient.ingredient)));
    });
    return filteredItems;
  }

  update(filteredRecipes) {
    this.card = '';
    if (!this.filteredRecipes.length) {
      const paragraph = document.createElement('p');
      paragraph.textContent = "Aucune recette n'a été trouvée."
      this.countRecipes = '';
      this.card.append(paragraph);
    } else {
      this.countRecipes.textContent = `${filteredRecipes.length} ${filteredRecipes.length === 1 ? 'recette' : 'recettes'}`;
      filteredRecipes.map((recipe) => new RecipeModel(recipe).render());
    }
    const filteredItems = this._extractFilteredItems(filteredRecipes);

  }
}
