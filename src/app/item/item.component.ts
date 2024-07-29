import { CommonModule } from '@angular/common';
import { Component, inject, Input, Output } from '@angular/core';
import { ListItemStore } from '../store/list-item.store';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  @Input() name : string = "";

  listItemStore = inject(ListItemStore);


  removeItem(itemName: string){
    this.listItemStore.removeItem(itemName);
  }
}
