import { SearchTagView } from '../views/searchTagView.js';

export class SearchTagModel {
  constructor(tags) {
    this.tags = tags
  }

  // Unique ingredient list function
  _getUniqueIngredients(recipes) {
    const ingredientsSet = new Set();

    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        ingredientsSet.add(ingredient.ingredient);
      });
    });

    return Array.from(ingredientsSet);
  }
  // Unique appliance list function
  _getUniqueAppliances(recipes) {
    const appliancesSet = new Set();

    recipes.forEach(recipe => {
      appliancesSet.add(recipe.appliance);
    });

    return Array.from(appliancesSet);
  }
  // Unique utensil list function
  _getUniqueUstensils(recipes) {
    const ustensilsSet = new Set();

    recipes.forEach(recipe => {
      recipe.ustensils.forEach(ustensil => {
        ustensilsSet.add(ustensil);
      });
    });

    return Array.from(ustensilsSet);
  }

  render() {
    const uniqueIngredients = this._getUniqueIngredients(this.tags);
    const uniqueAppliances = this._getUniqueAppliances(this.tags);
    const uniqueUstensils = this._getUniqueUstensils(this.tags);

    // uniqueIngredients.forEach(el => console.log('ingredient :', el));
    // uniqueAppliances.forEach(el => console.log('appliance :', el));
    // uniqueUstensils.forEach(el => console.log('ustensil :', el));

    const searchTagView = new SearchTagView();
    searchTagView.displaySearchTag(uniqueIngredients, uniqueAppliances, uniqueUstensils);
  }
}
