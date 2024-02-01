import { filterRecipes } from "../utils/filterRecipes.js";

export class Tag {
  constructor(name, recipes, tags) {
    this.name = name;
    this.allRecipes = recipes;
    this.selectedTags = tags;
    this.tagSection = document.querySelector('.tags');
  }
  createTag() {
    const tagContainer = document.createElement('div');
    tagContainer.classList.add('tags__container');

    const tagTitle = document.createElement('h3');
    tagTitle.textContent = this.name;

    const tagBtn = document.createElement('button');
    tagBtn.forEach((btn) => btn.addEventListener('click', this.removeTag));

    tagContainer.append(tagTitle, tagBtn);
    this.tagSection.appendChild(tagContainer);
    return this.tagSection;
  }

  removeTag() {
    const inputValue = document.querySelector('#search-recipe').value; // Search bar
    const tag = this.closest('.tag');

    // Enlever les espaces autour du texte
    const tagName = tag.textContent.trim();
    this.selectedTags.splice(this.selectedTags.indexOf(tagName), 1);
    new filterRecipes(this.allRecipes).filter(this.allRecipes, this.selectedTags, inputValue);
    tag.remove();
  }
}
