import { TagView } from '../views/tagView.js';

export class TagModel {
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
          itemsValue.forEach((item) => {
            typeof(item === 'object') && item.ingredient ? uniqueSet.add(item.ingredient) : uniqueSet.add(item);
          }); // Ingredients / Ustensils
        } else {
          uniqueSet.add(itemsValue); // Applicance
        }
      }
    });

    return Array.from(uniqueSet);
  }

  render() {
    const uniqueIngredients = this._getUniqueListByProperty(this.tags, 'ingredients');
    const uniqueAppliances = this._getUniqueListByProperty(this.tags, 'appliance');
    const uniqueUstensils = this._getUniqueListByProperty(this.tags, 'ustensils');

    const tagView = new TagView();
    tagView.displaySearchTag(uniqueIngredients, uniqueAppliances, uniqueUstensils, this.count);
  }
}
