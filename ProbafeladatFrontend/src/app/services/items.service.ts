import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Item, NewItem } from '../models/item';



const url = 'http://localhost:5144';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  constructor(private httpClient: HttpClient) { }

  getAllItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>( `${url}/items` );
  }

  getItemById( id: number ): Observable<Item> {
    return this.httpClient.get<Item>( `${url}/items/${id}` );
  }

  addItem(item: NewItem): Observable<void> {
    return this.httpClient.post<void>(`${url}/items`, item);
  }

  updateItem( id: number, item: Item ): Observable<void> {
    return this.httpClient.put<void>(`${url}/items/${id}`, item);
  }

  deleteItem( id: number ): Observable<void> {
    return this.httpClient.delete<void>(`${url}/items/${id}`);
  }
}

