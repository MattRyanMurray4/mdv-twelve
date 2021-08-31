import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emptyToy, Toy } from '@toys/api-interfaces';
import { ToysFacade } from '@toys/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'toys-toys',
  templateUrl: './toys.component.html',
  styleUrls: ['./toys.component.scss'],
})
export class ToysComponent implements OnInit {
  form: FormGroup;
  toys$: Observable<Toy[]> = this.toysFacade.allToys$;
  selectedToy$: Observable<Toy> = this.toysFacade.selectedToys$;
  constructor(
    private toysFacade: ToysFacade,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.toysFacade.loadToys();
    this.reset();
  }

  selectToy(toy: Toy) {
    this.toysFacade.selectToy(toy.id);
    this.form.patchValue(toy);
  }

  reset() {
    this.selectToy(emptyToy);
    this.form.reset();
  }

  createToy(toy: Toy) {
    this.toysFacade.createToy(toy);
    this.reset();
  }

  updateToy(toy: Toy) {
    this.toysFacade.updateToy(toy);
    this.reset();
  }

  saveToy(toy: Toy) {
    toy.id ? this.toysFacade.updateToy(toy) : this.toysFacade.createToy(toy);
  }

  deleteToy(toy: Toy) {
    this.toysFacade.deleteToy(toy);
    this.reset();
  }

  cancel() {
    this.reset();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: null,
      name: ['', Validators.required],
      brand: ['', Validators.required],
      yearMade: ['', Validators.required],
      cost: [''],
    });
  }
}
