import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IData } from './app.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  private url = environment.URL + '/api';

  constructor(private http: HttpClient) {}

  addData(data: IData): Observable<IData> {
    return this.http.post<IData>(`${this.url}/add`, data);
  }

  getData(): Observable<IData[]> {
    return this.http.get<IData[]>(`${this.url}/getData`);
  }
}
