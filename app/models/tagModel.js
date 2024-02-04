import { LowerCase } from '../utils/domUtil.js';
import { TagView } from '../views/tagView.js';

export class TagModel {
  constructor(tags) {
    this.tags = tags
    this.uniqueProperties = {
      ingredients: new Set(),
      appliances: new Set(),
      ustensils: new Set()
    };
  }

  _addPropertyToSet(propertySet, value) {
    return propertySet.add(LowerCase(value));
  }
  render() {
    this.tags.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => this._addPropertyToSet(this.uniqueProperties.ingredients, ingredient.ingredient));
      this._addPropertyToSet(this.uniqueProperties.appliances, recipe.appliance);
      recipe.ustensils.forEach((ustensil) => this._addPropertyToSet(this.uniqueProperties.ustensils, ustensil));
    });

    // Convert sets to arrays and sort alphabetically
    const propertiesArray = {};
    for (const property in this.uniqueProperties) {
      propertiesArray[property] = Array.from(this.uniqueProperties[property]).sort();
    }

    return new TagView(this.tags).displaySearchTag(propertiesArray, this.tags.length);
  }
}
