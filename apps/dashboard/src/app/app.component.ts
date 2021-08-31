import { Component } from '@angular/core';

@Component({
  selector: 'toys-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Toys-App';
  links = [
    { paht: '/', icon: 'home', title: 'Login' },
    { path: 'toys', icon: 'view_list', title: 'Toys-List' },
  ];
}
