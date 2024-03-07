import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { Item, NewItem } from 'src/app/models/item';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'type', 'price', 'actions'];

  public items: Item[] = [];

  public newItemFormGroup: FormGroup;

  public editForms: { [key: number]: FormGroup } = {};
  public editStates: { [key: number]: boolean } = {};

  constructor(private itemsService: ItemsService, private formBuilder: FormBuilder) { 
    this.newItemFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.itemsService.getAllItems().subscribe(items => {
      this.items = items;
      items.map((item) => {
        this.editForms[item.id] = this.formBuilder.group({
          name: [item.name !== null ? item.name : '', Validators.required],
          type: [item.type !== null ? item.type : '', Validators.required],
          price: [item.price !== null ? item.price : 0, Validators.required]
        });

        this.editStates[item.id] = false;
      });
    });
  }

  addNewItem(): void {
    if (this.newItemFormGroup.valid) {
      this.itemsService.addItem(this.newItemFormGroup.value).pipe(switchMap(() => this.itemsService.getAllItems())).subscribe((items) => {
        this.items = items;
        items.map((item) => {
          if (!this.editForms[item.id]) { 
            this.editForms[item.id] = this.formBuilder.group({
              name: [item.name !== null ? item.name : ''],
              type: [item.type !== null ? item.type : ''],
              price: [item.price !== null ? item.price : 0]
            });
            this.editStates[item.id] = false;
          }
        });
      });
    } else {
      this.newItemFormGroup.markAllAsTouched();
    }
  }

  getTableControl(itemId: number, field: string): FormControl {
    return this.editForms[itemId].get(field) as FormControl;
  }

  toggleEdit(itemId: number): void {
    this.editStates[itemId] = !this.editStates[itemId];
  }

  isEditing(itemId: number): boolean {
    return this.editStates[itemId];
  }

  saveItem(itemId: number): void {
    if (this.editForms[itemId].valid) {
      const editedItem = this.editForms[itemId].value;
      this.itemsService.updateItem(itemId, editedItem).subscribe(() => {
        this.items[this.items.findIndex((item) => item.id === itemId)] = { id: itemId, ...editedItem};
        const newItems = [...this.items];
        this.items = newItems;
        this.toggleEdit(itemId);
      });
    } else {
      this.editForms[itemId].markAsTouched();
    }
  }

  deleteItem(itemId: number): void {
    this.itemsService.deleteItem(itemId).subscribe(() => {
      const newItems = this.items.filter(item => item.id !== itemId);
      this.items = newItems;
    });
  }
}
