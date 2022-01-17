import { Component, OnInit } from '@angular/core';
import { PetDetails } from 'src/app/models';
import { PetRepository } from 'src/app/repository';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss'],
})
export class PetsListComponent implements OnInit {
  public pets: PetDetails[] = [];

  constructor(private readonly repository: PetRepository) {}

  ngOnInit() {
    this.getPets();
    console.log(this.pets);
  }

  public getPets(): void {
    this.repository.getPetDetails().subscribe(
      (response: PetDetails[]) => {
        this.pets = response;
        console.log(this.pets);
      },
      () => {}
    );
  }
}
