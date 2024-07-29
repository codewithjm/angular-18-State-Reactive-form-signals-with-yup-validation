import { Component, inject } from '@angular/core';
import { ItemComponent } from "../item/item.component";
import { CommonModule } from '@angular/common';
import { ListItemStore } from '../store/list-item.store';

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [ItemComponent, CommonModule],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.scss'
})
export class ListItemsComponent {
  itemStore = inject(ListItemStore);

  
}
