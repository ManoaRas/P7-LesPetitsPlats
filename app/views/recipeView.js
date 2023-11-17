import { SetAtt } from '../utils/DOMUtil.js';

export class RecipeView {
  constructor(data) {
    this.data = data;
    this.cards = document.querySelector('.cards')
  }

  _getImage(image, name) {
    const img = document.createElement('img');
    SetAtt(img, "src", `assets/${image}`);
    SetAtt(img, "alt", name);
    img.classList.add('cards--image');
    return img;
  }

  _getTime(time) {
    const span = document.createElement('span');
    span.classList.add('cards--time');
    span.textContent = `${time} min`;
    return span;
  }

  _getInfos(name, description, ingredients) {
    const recipe = document.createElement('div');
    recipe.classList.add('cards__infos');

    const recipeName = document.createElement('h2');
    recipeName.classList.add('cards__infos--name');
    recipeName.textContent = name;

    const recipeDescription = this._getInfosDescription(description);
    const recipeIngredient = this._getInfosIngredient(ingredients);

    recipe.append(recipeName, recipeDescription, recipeIngredient);
    return recipe;
  }

  _getInfosDescription(description) {
    const recipeDescription = document.createElement('div');
    recipeDescription.classList.add('cards__infos--description');

    const recipeDescriptionTitle = document.createElement('h3');
    recipeDescriptionTitle.classList.add('cards__infos--description--title');
    recipeDescriptionTitle.textContent = 'RECETTE';

    const recipeDescriptionText = document.createElement('p');
    recipeDescriptionText.classList.add('cards__infos--description--text');
    recipeDescriptionText.textContent = description;

    recipeDescription.append(recipeDescriptionTitle, recipeDescriptionText);
    return recipeDescription;
  }

  _getInfosIngredient(ingredients) {
    const recipeIngredients = document.createElement('div');
    recipeIngredients.classList.add('cards__infos--ingredient');

    const recipeIngredientsTitle = document.createElement('h3');
    recipeIngredientsTitle.classList.add('cards__infos--ingredient--title');
    recipeIngredientsTitle.textContent = 'INGRÉDIENTS';

    const recipeIngredientsText = document.createElement('ul');
    recipeIngredientsText.classList.add('cards__infos--ingredient--text');

    ingredients.forEach((ingredient) => {
      const ingredientList = document.createElement('li');
      const ingredientText = `${ingredient.ingredient} ${ingredient.quantity ? `${ingredient.quantity}` : ''} ${ingredient.unit ? `${ingredient.unit}` : ''}`

      ingredientList.textContent = ingredientText;
      recipeIngredientsText.appendChild(ingredientList);
    });

    recipeIngredients.append(recipeIngredientsTitle, recipeIngredientsText);
    return recipeIngredients;
  }

  displayRecipe(image, name, time, description, ingredients) {
    const cards = this.cards;
    const images = this._getImage(image, name);
    const times = this._getTime(time);
    const infos = this._getInfos(name, description, ingredients);

    cards.append(images, times, infos)
    return cards;
  }
}
