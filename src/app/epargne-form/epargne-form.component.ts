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


  //déclaration des attributs du formulaire
  public interestRate: number = 0;
  public inputCapital = this.epargneForm.controls['inputCapital']; // ou this.epargneForm.get('inputCapital')
  public savingsAmount = this.epargneForm.controls['savingsAmount'];
  public savingsDuration = this.epargneForm.controls['savingsDuration'];

  //déclaration des attributs pour le résultat du calcul de l'épargne
  public frequencyMonth: number = 12;
  public frequencyYears: number = 0;
  public totalSavingsxInterests: number = 0;
  public totalSavingsAmount: number = 0;
  public cumulativeInterest: number = 0;
  public cumulativeSavings: number = 0;



  updateCapitalxinterestRate(event: any) {

    // Extraire la valeur de l'option sélectionnée
    let selectedOption = event.target.value;
    console.log(selectedOption, typeof selectedOption);
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

      this.frequencyMonth;

    } else if (frequency === 'year') {

      this.frequencyYears = this.savingsDuration.value;

    }

  }


  // Méthode appelée lors de la soumission du formulaire
  calculateEpargne() {


    let solde = parseFloat(this.inputCapital.value); // convertir la valeur en type number car la valeur renvoyé est de type string
    var totalMonth = this.frequencyMonth * this.savingsDuration.value; // total des mois
    var monthInterestRate = this.interestRate / totalMonth; //taux d'intéret du mois
    

    //calcul des versements cummulés
    this.cumulativeSavings = parseFloat(this.inputCapital.value) + (parseFloat(this.savingsAmount.value) * totalMonth);


    //calcul de l'epargne pour versement par mois
    if (this.frequencyMonth) {


      for (let month = 1; month <= totalMonth; month++) {

        // Calcul montant des intérêts pour le mois en cours -> solde * (tauxIntéret% / 12 mois) = interet du mois
        var amountInterestMonth = solde * monthInterestRate;
        this.cumulativeInterest += amountInterestMonth;

        // Ajouter le montant épargné et les intérets au solde précédent -> 
        solde += parseFloat(this.savingsAmount.value) + amountInterestMonth;

      }

      // total de l'épargne avec intéret
      this.totalSavingsxInterests = solde;

    }


    console.log(this.totalSavingsxInterests);
    console.log('valeur inputCapital' + this.inputCapital.value, typeof this.inputCapital.value);
    console.log('valeur taux d\intéret' + this.interestRate, typeof this.interestRate);
    console.log('valeur frequence mois' + this.frequencyMonth, typeof this.frequencyMonth);
    console.log('intérets cummulés' + this.cumulativeInterest.toFixed(2), typeof this.cumulativeInterest);
    console.log('versement cummulés' + this.cumulativeSavings, typeof this.cumulativeSavings);

  }

}



