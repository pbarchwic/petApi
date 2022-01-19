import { Component, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { PetDetails } from 'src/app/models';
import { PetRepository } from 'src/app/repository';
import { ListRefresherService } from 'src/app/services';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss'],
})
export class PetFormComponent {
  public isSending = false;
  public isError = false;
  public isCompleted = false;
  public pet: PetDetails;
  public petForm: FormGroup;
  public forbiddenPetArray: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private readonly repository: PetRepository,
    private listRefresher: ListRefresherService
  ) {
    this.pet = {
      id: 0,
      category: {
        id: 0,
        name: 'string',
      },
      name: '',
      photoUrls: ['string'],
      tags: [
        {
          id: 0,
          name: 'string',
        },
      ],
      status: 'available',
    };

    this.petForm = this.formBuilder.group({
      petName: new FormControl('', [
        Validators.required,
        PetFormComponent.isForbiddenString(this.forbiddenPetArray),
      ]),
    });
  }

  public addPet(pet: PetDetails): void {
    this.isSending = true;
    this.petForm.disable();

    this.repository.addPet(pet).subscribe({
      next: () => {
        this.petForm.enable();
        this.forbiddenPetArray.push(pet.name);
        this.isSending = false;
      },
      error: () => {
        this.isError = true;
        this.isSending = false;
        this.petForm.enable();
      },
      complete: () => {
        this.petForm.enable();
        this.isCompleted = true;
        this.listRefresher.stringRefresh$.next(pet.name);
      },
    });
  }

  public onSubmit() {
    this.pet.name = this.petForm.value.petName;
    this.addPet(this.pet);
    this.petForm.reset({ petName: '' });
  }

  static isForbiddenString(forbiddenStrings: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (forbiddenStrings.indexOf(control.value) !== -1) {
        return { forbiddenStrings: true };
      }
      return null;
    };
  }
}
