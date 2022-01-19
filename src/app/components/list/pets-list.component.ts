import { Component, Input, OnInit } from '@angular/core';
import { PetDetails } from 'src/app/models';
import { PetRepository } from 'src/app/repository';
import { ListRefresherService } from 'src/app/services';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss'],
})
export class PetsListComponent implements OnInit {
  public pets: PetDetails[] = [];
  public refreshNeeded = false;
  constructor(
    private readonly repository: PetRepository,
    private listRefresher: ListRefresherService
  ) {}

  ngOnInit() {
    this.getPets();
    this.listRefresher.stringRefresh$.subscribe((name) => {
      this.pets.push({
        id: 0,
        category: {
          id: 0,
          name: 'string',
        },
        name: name,
        photoUrls: ['string'],
        tags: [
          {
            id: 0,
            name: 'string',
          },
        ],
        status: 'available',
      });
    });
  }

  public getPets(): void {
    this.repository.getPetDetails().subscribe((response: PetDetails[]) => {
      this.pets = response;
    });
  }

  public refreshList() {
    this.getPets();
  }
}
