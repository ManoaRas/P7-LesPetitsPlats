import { SearchBarView } from '../views/searchBarView.js';

export class SearchBarModel {
  // Permettre la sélection dans la recherche - À faire

  constructor(recipes) {
    this.recipes = recipes;
  }

  render() {
    new SearchBarView(this.recipes).displaySearchBar();
  }
}
