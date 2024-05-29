import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IText } from '../../interface/textinterface';

@Component({
  selector: 'app-zapyt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './zapyt.component.html',
  styleUrl: './zapyt.component.css',
})
export class ZapytComponent {
  @Input() viewText!: IText;
  @Output() confirmed = new EventEmitter<boolean>();

  confirm(result: boolean): void {
    this.confirmed.emit(result);
  }
}
