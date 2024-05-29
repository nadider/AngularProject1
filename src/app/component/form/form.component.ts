import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IText } from '../../interface/textinterface';
import { TextservisService } from '../../servis/textservis.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  title = 'Ввід-редагування замітки';
  @Input() viewText!: IText;
  @Output() formSubmitted = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private textService: TextservisService) {}

  ngOnInit(): void {
    console.log(this.viewText);
  }

  onSubmit(userForm: NgForm): void {
    const frmValue = userForm.form.value;

    if (this.viewText.id) {
      const newText: IText = {
        id: this.viewText.id,
        title: frmValue.title,
        content: frmValue.content,
      };
      this.textService.updateText(newText);
    } else {
      const newText: IText = {
        id: Date.now(),
        title: frmValue.title,
        content: frmValue.content,
      };
      this.textService.addText(newText);
    }
    this.formSubmitted.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
