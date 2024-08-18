import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private url = 'https://jsonplaceholder.typicode.com/posts';
  private http = inject(HttpClient);
  constructor() {}

  getProductsPage(): Observable<any> {
    return this.http.get<Observable<any>>(`${this.url}`);
  }
}
