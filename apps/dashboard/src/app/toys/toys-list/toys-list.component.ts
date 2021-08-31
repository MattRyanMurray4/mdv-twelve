import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Toy } from '@toys/api-interfaces';

@Component({
  selector: 'toys-toys-list',
  templateUrl: './toys-list.component.html',
  styleUrls: ['./toys-list.component.scss'],
})
export class ToysListComponent {
  @Input() toys: Toy[] | null;
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
