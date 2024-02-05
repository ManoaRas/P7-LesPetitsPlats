import { SearchBarView } from '../views/searchBarView.js';

export class SearchBarModel {
  // Title, description, ingredients - Fait (Récupéré)
  // 3 caracters minimum - Fait
  // Interface actualisée - En cours
  // Les tags sont actualisées avec les informations des 3 types de tags des recettes affichées - À faire
  // Reprendre le filtrage dans le input des tags - À faire
  // Permettre la sélection dans la recherche - À faire

  constructor(recipes) {
    this.recipes = recipes;
  }

  render() {
    new SearchBarView(this.recipes).displaySearchBar();
  }
}
