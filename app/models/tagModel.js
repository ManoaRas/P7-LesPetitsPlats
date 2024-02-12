import { TagView } from '../views/tagView.js';

export class TagModel {
  constructor(tags) {
    this.tags = tags
    this.count = tags.length
    this.uniqueProperties = {
      ingredients: new Set(),
      appliances: new Set(),
      ustensils: new Set()
    };
  }

  _addPropertyToSet(propertySet, value) {
    return propertySet.add(value);
  }
  render() {
    this.tags.forEach((recipe) => {
      // INGREDIENTS
      recipe.ingredients.forEach((ingredient) => this._addPropertyToSet(this.uniqueProperties.ingredients, ingredient.ingredient));

      // APPLIANCES
      recipe.appliances.forEach((appliance) => this._addPropertyToSet(this.uniqueProperties.appliances, appliance));

      // USTENSILS
      recipe.ustensils.forEach((ustensil) => this._addPropertyToSet(this.uniqueProperties.ustensils, ustensil));
    });

    // Convert sets to arrays and sort alphabetically
    const propertiesArray = {};
    for (const property in this.uniqueProperties) {
      propertiesArray[property] = Array.from(this.uniqueProperties[property]).sort();
    }

    return new TagView(this.tags).displaySearchTag(propertiesArray, this.count);
  }
}
