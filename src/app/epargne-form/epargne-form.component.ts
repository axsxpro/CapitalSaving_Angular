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

    inputCapital: new FormControl(),
    savingsAmount: new FormControl('', [Validators.min(0)]), //[Validators.min(0)]:  la valeur saisie dans le champ du montant épargné est supérieure ou égale à zéro.
    savingsDuration: new FormControl()

  });


  //déclaration des attributs
  public interestRate: any;
  public inputCapital = this.epargneForm.controls['inputCapital']; // ou this.epargneForm.get('inputCapital')
  public savingsAmount = this.epargneForm.controls['savingsAmount'];
  public savingsDuration = this.epargneForm.controls['savingsDuration'];
  public frequencyMonth: number = 0;
  public frequencyYears: number = 0;




  updateCapitalxinterestRate(event: any) {

    // Extraire la valeur de l'option sélectionnée
    let selectedOption = event.target.value;
    let nameOption = event.target.selectedOptions[0].getAttribute('name');

    // Mettre à jour le taux d'intérêt en fonction de l'option sélectionnée
    if (nameOption === 'LivretA') {
      this.interestRate = 0.03;
    } else if (nameOption === 'LDDS') {
      this.interestRate = 0.03;
    } else if (nameOption === 'LEP') {
      this.interestRate = 0.05;
    } else if (nameOption === 'PEL') {
      this.interestRate = 0.0225;
    } else {
      this.interestRate = 0;
    }

    let inputCapital = document.getElementById('inputCapital');

    // si il n' y a pas de value selectionnée 
    if (!selectedOption) {

      if (inputCapital) {
        inputCapital.setAttribute('placeholder', '€'); // Réinitialiser le placeholder à €
      }

      return; // Sortir de la méthode si l'option sélectionnée est vide
    }

    // modification de la valeur de l'input
    this.inputCapital.setValue(''); // Réinitialiser la valeur de l'input à vide
    this.inputCapital.setValidators([Validators.min(selectedOption)]);// modification de la contrainte minimale de l'input en fonction de l'option
    //this.epargneForm.controls['capital'].updateValueAndValidity()

    // Modifier le placeholder en fonction de la valeur sélectionnée
    if (inputCapital) {
      inputCapital.setAttribute('placeholder', 'Capital minimum de : ' + selectedOption + '€');
    }

  }


  selectSavingsFrequency(frequency: string) {

    if (frequency === 'month') {

      this.frequencyMonth = 12;

    } else if (frequency === 'year') {

      this.frequencyYears = this.savingsDuration.value;

    }

  }


  // Méthode appelée lors de la soumission du formulaire
  calculateEpargne() {


    for (let mois = 1; mois <= nombreDeMois; mois++) {
      // Calcul des intérêts pour ce mois
      const interets = capitalEpargne * tauxInteretMensuel;

      // Ajout du montant épargné au capital pour ce mois
      capitalEpargne += montantEpargne;

      // Ajout des intérêts au capital pour le mois suivant
      capitalEpargne += interets;
    }


  }

}



