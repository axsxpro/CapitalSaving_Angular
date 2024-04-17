import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-epargne-form',
  templateUrl: './epargne-form.component.html',
  styleUrls: ['./epargne-form.component.css']
})

export class EpargneFormComponent {

// initialisation du formulaire 
epargneForm: FormGroup = new FormGroup({
    capital: new FormControl(),
    savingsAmount: new FormControl(),
    month: new FormControl(),
    years: new FormControl(),
    savingsDuration: new FormControl()
  });



  updatePlaceholder(event: any) {

  const selectedLivret = event.target.value;
  this.epargneForm.controls['capital'].setValidators([Validators.min(this.livretMontantInitial[selectedLivret])]);
  this.epargneForm.controls['capital'].updateValueAndValidity();
  
}


  // Méthode appelée lors de la soumission du formulaire
  calculateEpargne() {
  

  }



}

