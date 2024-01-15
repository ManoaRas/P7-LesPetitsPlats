import { SearchTagView } from '../views/searchTagView.js';

export class SearchTagModel {
  constructor(tags) {
    this.tags = tags
    this.count = tags.length
  }

  _getUniqueListByProperty(recipes, items) {
    const uniqueSet = new Set();

    recipes.forEach((recipe) => {
      if (recipe[items]) {
        const itemsValue = recipe[items];

        if (Array.isArray(itemsValue)) {
          // Ingredients / Ustensils
          itemsValue.forEach((item) => {
            typeof(item === 'object') && item.ingredient ? uniqueSet.add(item.ingredient) : uniqueSet.add(item);
          });
        } else {
          // Applicance
          uniqueSet.add(itemsValue);
        }
      }
    });

    return Array.from(uniqueSet);
  }

  render() {
    const uniqueIngredients = this._getUniqueListByProperty(this.tags, 'ingredients');
    const uniqueAppliances = this._getUniqueListByProperty(this.tags, 'appliance');
    const uniqueUstensils = this._getUniqueListByProperty(this.tags, 'ustensils');

    const searchTagView = new SearchTagView();
    searchTagView.displaySearchTag(uniqueIngredients, uniqueAppliances, uniqueUstensils, this.count);
  }
}
