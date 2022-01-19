import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { PetDetails } from '../models';

@Injectable()
export class PetRepository {
  public url = 'https://petstore.swagger.io/v2/pet';
  constructor(private readonly http: HttpClient) {}

  public getPetDetails(): Observable<PetDetails[]> {
    return this.http
      .get<PetDetails[]>(`${this.url}/findByStatus?status=available`)
      .pipe(tap((response) => response));
  }

  public addPet(pet: PetDetails): Observable<void> {
    return this.http.post<void>(this.url, pet);
  }
}
