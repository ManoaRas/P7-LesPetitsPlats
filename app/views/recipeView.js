import { SetAtt } from '../utils/domUtil.js';

export class RecipeView {
  constructor() {
    this.cards = document.querySelector('.cards')
  }

  _getImage(image, name) {
    const img = document.createElement('img');
    SetAtt(img, "src", `assets/images/cards/${image}`);
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

  _getInfos(name, description, ingredients) {
    const recipe = document.createElement('div');
    recipe.classList.add('card__recipe');

    const recipeName = document.createElement('h2');
    recipeName.classList.add('card__recipe--name');
    recipeName.textContent = name;

    const recipeDescription = this._getInfosDescription(description);
    const recipeIngredient = this._getInfosIngredient(ingredients);

    recipe.append(recipeName, recipeDescription, recipeIngredient);
    return recipe;
  }

  _getInfosDescription(description) {
    const recipeDescription = document.createElement('div');
    recipeDescription.classList.add('card__recipe__infos');

    const recipeDescriptionTitle = document.createElement('h4');
    recipeDescriptionTitle.classList.add('card__recipe__infos--title');
    recipeDescriptionTitle.textContent = 'RECETTE';

    const recipeDescriptionText = document.createElement('p');
    recipeDescriptionText.classList.add('card__recipe__infos--description');
    recipeDescriptionText.textContent = description;

    recipeDescription.append(recipeDescriptionTitle, recipeDescriptionText);
    return recipeDescription;
  }

  _getInfosIngredient(ingredients) {
    const recipeIngredients = document.createElement('div');
    recipeIngredients.classList.add('card__recipe__infos');

    const recipeIngredientsTitle = document.createElement('h4');
    recipeIngredientsTitle.classList.add('card__recipe__infos--title');
    recipeIngredientsTitle.textContent = 'INGRÉDIENTS';

    const recipeIngredientsList = document.createElement('ul');
    recipeIngredientsList.classList.add('card__recipe__infos__list');

    ingredients.forEach((ingredient) => {
      const ingredientList = document.createElement('li');
      ingredientList.classList.add('card__recipe__infos__list__item');

      const ingredientListText = document.createElement('span');
      ingredientListText.classList.add('card__recipe__infos__list__item--text');
      const ingredientListQuantity = document.createElement('span');
      ingredientListQuantity.classList.add('card__recipe__infos__list__item--quantity');

      const breakRow = document.createElement('br');

      ingredientListText.textContent = `${ingredient.ingredient ? `${ingredient.ingredient}` : ' '}`;
      ingredientListQuantity.textContent = `${ingredient.quantity ? `${ingredient.quantity}` : ' '} ${ingredient.unit ? `${ingredient.unit}` : ' '}`;

      ingredientList.append(ingredientListText, breakRow, ingredientListQuantity);
      recipeIngredientsList.appendChild(ingredientList);
    });

    recipeIngredients.append(recipeIngredientsTitle, recipeIngredientsList);
    return recipeIngredients;
  }

  displayRecipe(id, image, name, time, description, ingredients) {
    const cards = this.cards;

    const images = this._getImage(image, name);
    const times = this._getTime(time);
    const infos = this._getInfos(name, description, ingredients);

    const card = document.createElement('article');
    card.classList.add('card');

    SetAtt(card, 'data-id', id);
    SetAtt(card, 'data-display', 'block');

    card.append(images, times, infos);
    cards.appendChild(card);
    return cards;
  }
}
