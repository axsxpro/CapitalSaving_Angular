import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-epargne-form',
  templateUrl: './epargne-form.component.html',
  styleUrls: ['./epargne-form.component.css']
})

export class EpargneFormComponent {

  // initialisation du formulaire 
  epargneForm: FormGroup = new FormGroup({

    capital: new FormControl(),
    savingsAmount: new FormControl('', [Validators.min(0)]), //[Validators.min(0)]:  la valeur saisie dans le champ du montant épargné est supérieure ou égale à zéro.
    month: new FormControl(),
    years: new FormControl(),
    savingsDuration: new FormControl()

  });


  updateMinEpargne(event: any) {
    
    // Extraire la valeur de l'option sélectionnée
    const selectedMontant = event.target.value; 

    // modification de la valeur de l'input
    this.epargneForm.controls['capital'].setValue(null); // Réinitialiser la valeur de l'input à vide
    this.epargneForm.controls['capital'].setValidators([Validators.min(selectedMontant)]);// modification de la contrainte minimale de l'input en fonction de l'option
    //this.epargneForm.controls['capital'].updateValueAndValidity()

    // Modifier le placeholder en fonction de la valeur sélectionnée
    const inputElement = document.getElementById('inputCapital');
    if (inputElement) {
      inputElement.setAttribute('placeholder', 'Capital minimum de : ' + selectedMontant + '€');
    } 

  }



  // Méthode appelée lors de la soumission du formulaire
  calculateEpargne() {

  }



}

