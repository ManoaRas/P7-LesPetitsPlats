import { SearchBarView } from '../views/searchBarView.js';

export class SearchBarModel {
  render() {
    const searchBarView = new SearchBarView();
    searchBarView.displaySearchBar();
  }
}
