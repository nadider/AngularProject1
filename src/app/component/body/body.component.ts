import { Component, OnInit } from '@angular/core';
import { IText } from '../../interface/textinterface';
import { TextservisService } from '../../servis/textservis.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormComponent } from '../form/form.component';
import { BoxComponent } from '../viewbox/box.component';
import { ZapytComponent } from '../zapyt/zapyt.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FormComponent,
    BoxComponent,
    ZapytComponent,
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent implements OnInit {
  viewText: IText[] = [];
  filteredText: IText[] = [];
  selectedText: IText | null = null;
  isCreating: boolean = false;
  isEditing: boolean = false;
  isConfirming: boolean = false;
  textToDelete: IText | null = null;
  searchTerm: string = '';

  constructor(private textService: TextservisService) {}

  ngOnInit(): void {
    this.loadText();
  }

  loadText(): void {
    this.viewText = this.textService.getText();
    this.filterText();
  }

  filterText(): void {
    if (this.searchTerm) {
      this.filteredText = this.viewText.filter((viewText) =>
        viewText.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredText = this.viewText;
    }
  }

  onSearchTermChange(): void {
    this.filterText();
  }

  selectText(viewText: IText): void {
    this.selectedText = viewText;
    this.isCreating = false;
    this.isEditing = false;
  }

  createText(): void {
    this.selectedText = { id: 0, title: '', content: '' };
    this.isCreating = true;
    this.isEditing = false;
  }

  editText(viewText: IText): void {
    this.selectedText = viewText;
    this.isCreating = false;
    this.isEditing = true;
  }

  enquireDelete(viewText: IText): void {
    this.textToDelete = viewText;
    this.isConfirming = true;
  }

  deleteText(confirmed: boolean): void {
    if (confirmed && this.textToDelete) {
      this.textService.deleteText(this.textToDelete.id);
      this.loadText();
      this.selectedText = null;
    }
    this.isConfirming = false;
    this.textToDelete = null;
  }

  cancel(): void {
    this.selectedText = null;
    this.isCreating = false;
    this.isEditing = false;
  }

  onFormSubmitted(): void {
    this.selectedText = null;
    this.isCreating = false;
    this.isEditing = false;
    this.loadText();
  }
}
