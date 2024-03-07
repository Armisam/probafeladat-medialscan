import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [HttpClientModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatTableModule, BrowserAnimationsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should adding a new item invalid', () => {
    const initialItemsLength = component.items.length;
    component.newItemFormGroup.setValue({ name: 'New Item', type: null, price: 10 });
    component.addNewItem();
    expect(component.newItemFormGroup.invalid).toBe(true);
  });
  
  it('should toggle edit mode for an item', () => {
    component.items = [{id: 1, name: 'Item 1', type: 'Type A', price: 10.00}];
    const itemIdToEdit = component.items[0].id;
    const initialState = component.editStates[itemIdToEdit];
    component.toggleEdit(itemIdToEdit);
    expect(component.editStates[itemIdToEdit]).toBe(!initialState);
  });
});
