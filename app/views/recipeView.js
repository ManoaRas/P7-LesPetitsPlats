import { SetAtt } from '../utils/DOMUtil.js';

export class RecipeView {
  constructor() {
    this.cards = document.querySelector('.cards')
  }

  _getImage(image, name) {
    const img = document.createElement('img');
    SetAtt(img, "src", `../../assets/images/cards/${image}`);
    SetAtt(img, "alt", name);
    img.classList.add('card--image');
    return img;
  }

  _getTime(time) {
    const timeDiv = document.createElement('div');
    timeDiv.classList.add('card--time');
    timeDiv.textContent = `${time} min`;
    return timeDiv;
  }

  _getInfosRecipes(description) {
    const recipeDescription = document.createElement('div');
    recipeDescription.classList.add('recipe-infos');

    const recipeDescriptionTitle = document.createElement('h3');
    recipeDescriptionTitle.classList.add('recipe-infos--title');
    recipeDescriptionTitle.textContent = 'RECETTE';

    const recipeDescriptionText = document.createElement('p');
    recipeDescriptionText.classList.add('recipe-infos--description');
    recipeDescriptionText.textContent = description;

    recipeDescription.append(recipeDescriptionTitle, recipeDescriptionText);
    return recipeDescription;
  }

  _getInfosIngredient(ingredients) {
    const recipeIngredients = document.createElement('div');
    recipeIngredients.classList.add('recipe-infos');

    const recipeIngredientsTitle = document.createElement('h3');
    recipeIngredientsTitle.classList.add('recipe-infos--title');
    recipeIngredientsTitle.textContent = 'INGRÉDIENTS';

    const recipeIngredientsList = document.createElement('ul');
    recipeIngredientsList.classList.add('ingredients-list');

    ingredients.forEach((ingredient) => {
      const ingredientsList = document.createElement('li');
      ingredientsList.classList.add('ingredients-list__item');

      const ingredientsListText = document.createElement('span');
      ingredientsListText.classList.add('ingredients-list__item--text');
      const ingredientsListQuantity = document.createElement('span');
      ingredientsListQuantity.classList.add('ingredients-list__item--quantity');

      ingredientsListText.textContent = `${ingredient.ingredient ? `${ingredient.ingredient}` : ' '}`;
      ingredientsListQuantity.textContent = `${ingredient.quantity ? `${ingredient.quantity}` : ' '} ${ingredient.unit ? `${ingredient.unit}` : ' '}`;

      ingredientsList.append(ingredientsListText, ingredientsListQuantity);
      recipeIngredientsList.appendChild(ingredientsList);
    });

    recipeIngredients.append(recipeIngredientsTitle, recipeIngredientsList);
    return recipeIngredients;
  }

  _getInfos(name, description, ingredients) {
    const recipe = document.createElement('div');
    recipe.classList.add('recipe');

    const recipeName = document.createElement('h2');
    recipeName.classList.add('recipe--name');
    recipeName.textContent = name;

    const recipeDescription = this._getInfosRecipes(description);
    const recipeIngredient = this._getInfosIngredient(ingredients);

    recipe.append(recipeName, recipeDescription, recipeIngredient);
    return recipe;
  }

  displayRecipe(id, image, name, time, description, ingredients) {
    const cards = this.cards;

    const images = this._getImage(image, name);
    const times = this._getTime(time);
    const infos = this._getInfos(name, description, ingredients);

    const card = document.createElement('a');
    card.classList.add('card');

    SetAtt(card, 'data-id', id);
    SetAtt(card, 'href', '#');
    SetAtt(card, 'tabindex', '0');

    card.append(images, times, infos);
    cards.appendChild(card);
    return cards;
  }
}
