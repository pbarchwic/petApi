import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ListRefresherService {
  public stringRefresh$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
}
