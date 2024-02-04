import { SearchBarView } from '../views/searchBarView.js';

export class SearchBarModel {
  // Title, description, ingredients
  // 3 caracters minimum
  // Interface actualisée
  // Les tags sont actualisées avec les informations des 3 types de tags des recettes affichées
  // Reprendre le filtrage dans le input des tags
  // Permettre la sélection dans la recherche
  render() {
    const searchBarView = new SearchBarView();
    searchBarView.displaySearchBar();
  }
}
