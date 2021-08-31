import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Toy } from '@toys/api-interfaces';

@Component({
  selector: 'toys-toy-details',
  templateUrl: './toy-details.component.html',
  styleUrls: ['./toy-details.component.scss'],
})
export class ToyDetailsComponent {
  currentToy: Toy;
  originalName: string;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
  @Input() set toy(value: Toy | null) {
    if (value) this.originalName = value.name;
    this.currentToy = Object.assign({}, value);
  }

  @Input() form: FormGroup;

  save(toy: Toy) {
    this.saved.emit(toy);
  }

  cancel() {
    this.cancelled.emit();
  }

  saveForm(formDirective: FormGroupDirective) {
    if (formDirective.invalid) return;
    this.saved.emit(formDirective.value);
    formDirective.resetForm();
  }
}
