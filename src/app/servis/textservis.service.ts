import { Injectable } from '@angular/core';
import { IText } from '../interface/textinterface';

@Injectable({
  providedIn: 'root',
})
export class TextservisService {
  private storageKey = 'viewText';

  constructor() {}

  getText(): IText[] {
    const viewText = localStorage.getItem(this.storageKey);
    return viewText ? JSON.parse(viewText) : [];
  }

  getTextById(id: number): IText | undefined {
    const viewText = this.getText();
    return viewText.find((viewText) => viewText.id === id);
  }

  addText(textint: IText): void {
    const viewText = this.getText();
    viewText.push(textint);
    localStorage.setItem(this.storageKey, JSON.stringify(viewText));
  }

  updateText(updatedText: IText): void {
    let viewText = this.getText();
    viewText = viewText.map((textint) =>
      textint.id === updatedText.id ? updatedText : textint
    );
    localStorage.setItem(this.storageKey, JSON.stringify(viewText));
  }

  deleteText(id: number): void {
    let viewText = this.getText();
    viewText = viewText.filter((textint) => textint.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(viewText));
  }
}
