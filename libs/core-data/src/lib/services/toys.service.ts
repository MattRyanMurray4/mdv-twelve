import { mapTo } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Toy } from '@toys/api-interfaces';

export const BASE_URL = 'https://db-30x30.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class ToysService {
  private model = 'toys';
  constructor(private httpClient: HttpClient) {}

  all() {
    return this.httpClient.get<Toy[]>(this.getUrl());
  }

  find(id: string) {
    return this.httpClient.get<Toy>(this.getUrlById(id));
  }

  create(toy: Toy) {
    return this.httpClient.post<Toy>(this.getUrl(), toy);
  }

  update(toy: Toy) {
    return this.httpClient.patch<Toy>(this.getUrlById(toy.id), toy);
  }

  delete(toyId: string) {
    return this.httpClient
      .delete<string>(this.getUrlById(toyId))
      .pipe(mapTo(toyId));
  }

  private getUrl() {
    return `${BASE_URL}${this.model}`;
  }

  private getUrlById(id: string) {
    return `${this.getUrl()}/${id}`;
  }
}
