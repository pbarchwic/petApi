import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { PetDetails } from '../models';

@Injectable()
export class PetRepository {
  constructor(private readonly http: HttpClient) {}

  public getPetDetails(): Observable<PetDetails[]> {
    return this.http
      .get<PetDetails[]>(
        `https://petstore.swagger.io/v2/pet/findByStatus?status=available`
      )
      .pipe(tap((response) => response));
  }

  public addPet() {}
}
