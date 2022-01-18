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

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss'],
})
export class PetFormComponent {
  public pet: PetDetails;
  public petForm: FormGroup;
  public forbiddenPetArray: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private readonly repository: PetRepository
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
    // this.isLoading = true;
    // this.isError = false;
    this.petForm.disable();

    this.repository.addPet(pet).subscribe(
      () => {
        this.petForm.enable;
        // this.isLoading = false;
      },
      () => {
        // this.error = error instanceof HttpErrorResponse && error.status;
        // this.isError = true;
        // this.isLoading = false;
        this.petForm.enable();
      },
      () => {
        this.petForm.enable();
      }
    );
  }

  public onSubmit() {
    this.pet.name = this.petForm.value.petName;
    this.addPet(this.pet);
    this.forbiddenPetArray.push(this.petForm.value.petName);
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
