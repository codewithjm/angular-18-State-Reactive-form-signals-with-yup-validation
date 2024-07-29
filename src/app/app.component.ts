import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from './input/input.component';
import { ItemComponent } from './item/item.component';
import { ListItemsComponent } from './list-items/list-items.component';


const shreadComponent = [InputComponent, ListItemsComponent];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ...shreadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'state-management-signal';
}
