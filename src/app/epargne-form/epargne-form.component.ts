import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-epargne-form',
  templateUrl: './epargne-form.component.html',
  styleUrls: ['./epargne-form.component.css']
})

export class EpargneFormComponent {

  formSubmitted: boolean = false;
  optionFrequency: boolean = false;

  // initialisation du formulaire 
  epargneForm: FormGroup = new FormGroup({

    option: new FormControl("", [Validators.required]),
    inputCapital: new FormControl("", [Validators.required, Validators.min(0)]), // Validators.max() : valeur maximum du champs
    savingsAmount: new FormControl("", [Validators.required]), //[Validators.min(0)]:  la valeur saisie dans le champ du montant épargné est supérieure ou égale à zéro.
    savingsDuration: new FormControl("", [Validators.required]),

  });


  //déclaration des attributs/récupération des inputs du formulaire
  selectedOption: number = 0;
  inputCapitalValue: number = 0;
  public interestRate: number = 0;
  public inputCapital = this.epargneForm.controls['inputCapital']; // ou this.epargneForm.get('inputCapital')
  public savingsAmount = this.epargneForm.controls['savingsAmount'];
  public savingsDuration = this.epargneForm.controls['savingsDuration'];


  //déclaration des attributs pour le résultat du calcul de l'épargne
  public frequencyMonth: number = 0;
  public frequencyYears: number = 0;
  public totalSavingsxInterests: number = 0;
  public totalSavingsAmount: number = 0;
  public cumulativeInterest: number = 0;
  public cumulativeSavings: number = 0;

  maxAmount: number = 0;
  showInput: boolean = true;
  frequencySelected : string = '';


  updateCapitalxinterestRate(event: any) {

    // Extraire la valeur de l'option sélectionnée
    this.selectedOption = parseFloat(event.target.value);
    let nameOption = event.target.selectedOptions[0].getAttribute('name'); //selection du nom de l'option


    // Mettre à jour le taux d'intérêt en fonction de l'option sélectionnée
    if (nameOption === 'LivretA') {

      this.interestRate = 0.03;
      this.maxAmount = 22950;

    } else if (nameOption === 'LDDS') {

      this.interestRate = 0.03;
      this.maxAmount = 12000;

    } else if (nameOption === 'LEP') {

      this.interestRate = 0.05;
      this.maxAmount = 10000;

    } else if (nameOption === 'PEL') {

      this.interestRate = 0.0225;
      this.maxAmount = 61200;

    } else {

      this.interestRate = 0;
    }

    // Définir les validateurs pour le champ inputCapital
    let validators = [Validators.required];
    if (this.selectedOption) {
      validators.push(Validators.min(this.selectedOption));
    }
    this.inputCapital.setValidators(validators);
    this.inputCapital.updateValueAndValidity();


    let inputCapital = document.getElementById('inputCapital');

    // si il n' y a pas de value selectionnée 
    if (!this.selectedOption) {

      if (inputCapital) {
        inputCapital.setAttribute('placeholder', '€'); // Réinitialiser le placeholder à €
      }
      return; // Sortir de la méthode si l'option sélectionnée est vide

    } else {
      // Modifier le placeholder en fonction de la valeur sélectionnée
      if (inputCapital) {
        inputCapital.setAttribute('placeholder', 'Capital minimum: ' + this.selectedOption + '€/ maximum: ' + this.maxAmount + '€');
      }

    }

    console.log(nameOption + ' -> montant minimal livret : ' + this.selectedOption, typeof this.selectedOption + ' montant maximal: ' + this.maxAmount, typeof this.maxAmount);

  }


  hideSavingsAmount(event: any) {

    this.inputCapitalValue = parseFloat(event.target.value);
    console.log(this.inputCapitalValue);

    if (this.inputCapitalValue >= this.maxAmount) {

      this.showInput = false;

      if (this.savingsAmount && this.savingsDuration) {

        this.savingsAmount.clearValidators();
        this.savingsDuration.clearValidators();
        this.savingsAmount.updateValueAndValidity();
        this.savingsDuration.updateValueAndValidity();
      }

    } else {

      this.showInput = true;
    }

  }


  selectSavingsFrequency(frequency: string) {

    if (frequency === 'month') {

      this.frequencyMonth = 12;
      this.frequencyYears = 0;
      this.optionFrequency = true;
      this.frequencySelected = frequency;
      console.log(frequency);
      console.log(this.frequencySelected);


    } else if (frequency === 'years') {

      this.frequencyYears = this.savingsDuration.value;
      this.frequencyMonth = 0;
      console.log(this.savingsDuration.value, typeof this.savingsDuration.value)
      this.optionFrequency = true;
      this.frequencySelected = frequency;
      console.log(frequency);
      console.log(this.frequencySelected);

    }

  }


  // Méthode appelée lors de la soumission du formulaire
  calculateEpargne() {

    if (this.epargneForm.valid) {

      this.formSubmitted = true;

      let initialSolde = parseFloat(this.inputCapital.value);
      let cummulativeSolde = parseFloat(this.inputCapital.value); // convertir la valeur en type number car la valeur renvoyé est de type string
      let savingsAmount = parseFloat(this.savingsAmount.value);
      var totalMonth = this.frequencyMonth * this.savingsDuration.value; // total des mois
      var monthInterestRate = this.interestRate / 12; //taux d'intéret du mois


      // calcul de l'épargne pour versement par mois
      if (this.frequencySelected === 'month') {

        // calcul des versements cummulés
        this.cumulativeSavings = initialSolde + (savingsAmount * totalMonth);

        for (let month = 1; month <= totalMonth; month++) {

          // Calcul montant des intérêts pour le mois en cours -> solde * (tauxIntéret% / 12 mois) = interet du mois
          var amountInterestMonth = cummulativeSolde * monthInterestRate;
          //console.log(amountInterestMonth + ', mois : '+ month)

          // total des intérets cummulés 
          this.cumulativeInterest += amountInterestMonth;

          // Ajouter le montant épargné et les intérets au solde précédent -> 
          cummulativeSolde += savingsAmount + amountInterestMonth;

        }

        // total de l'épargne avec intéret
        this.totalSavingsxInterests = cummulativeSolde;


        console.log('inputCapital: ' + this.inputCapital.value, typeof this.inputCapital.value);
        console.log('durée d\'épargne: ' + this.savingsDuration.value, typeof this.savingsDuration.value);
        console.log('taux d\'intéret: ' + this.interestRate, typeof this.interestRate);
        console.log('frequence mois: ' + this.frequencyMonth, typeof this.frequencyMonth);
        console.log('intérets cummulés: ' + this.cumulativeInterest.toFixed(2), typeof this.cumulativeInterest);
        console.log('versement cummulés: ' + this.cumulativeSavings, typeof this.cumulativeSavings);
        var formattedValue = (Math.ceil(this.totalSavingsxInterests * 100) / 100).toFixed(2);
        console.log('total épargne par mois: ' + formattedValue);


      } else if (this.frequencySelected === 'years') {

        var totalYears = this.savingsDuration.value;
        var yearInterestRate: number = 0;

        // calcul des versements cummulés
        this.cumulativeSavings = initialSolde + (savingsAmount * totalYears);

        for (let year = 1; year <= totalYears; year++) {

          // solde cummulé + montant versement
          cummulativeSolde += savingsAmount;

          // calcul du taux d'intéret à l'année
          yearInterestRate = cummulativeSolde * this.interestRate;

          this.cumulativeInterest += yearInterestRate;

          cummulativeSolde += yearInterestRate;

        }

        this.totalSavingsxInterests = cummulativeSolde;

        console.log('inputCapital: ' + this.inputCapital.value, typeof this.inputCapital.value);
        console.log('durée d\'épargne: ' + this.savingsDuration.value, typeof this.savingsDuration.value);
        console.log('taux d\intéret: ' + this.interestRate, typeof this.interestRate);
        console.log('frequence année: ' + this.frequencyYears, typeof this.frequencyYears);
        console.log('cummulés: ' + this.cumulativeInterest.toFixed(2), typeof this.cumulativeInterest);
        console.log('versement cummulés: ' + this.cumulativeSavings, typeof this.cumulativeSavings);
        console.log('total épargne par année: ' + this.totalSavingsxInterests);

      } else {

        var totalYears = this.savingsDuration.value;
        var interestRate = this.interestRate
        var yearInterestRate: number = 0;
        let initialSolde = parseFloat(this.inputCapital.value);

        for (let year = 1; year <= totalYears; year++) {

          yearInterestRate = initialSolde * interestRate;

          this.cumulativeInterest += yearInterestRate;

          cummulativeSolde += yearInterestRate;

        }

        this.totalSavingsxInterests = cummulativeSolde;

        console.log('inputCapital: ' + this.inputCapital.value, typeof this.inputCapital.value);
        console.log('durée d\'épargne: ' + this.savingsDuration.value, typeof this.savingsDuration.value);
        console.log('taux d\intéret: ' + this.interestRate, typeof this.interestRate);
        console.log('intérets cummulés: ' + this.cumulativeInterest.toFixed(2), typeof this.cumulativeInterest);
        console.log('versement cummulés: ' + this.cumulativeSavings, typeof this.cumulativeSavings);
        console.log('total épargne si plafond dépassé: ' + this.totalSavingsxInterests);

      }

    } else {

      // Afficher les détails de l'erreur dans la console pour chaque champ invalide
      console.log("Erreur de formulaire : ", this.epargneForm.errors);
      if (this.epargneForm.controls['option'].invalid) {
        console.log("Erreur dans le champ 'Type de Livret/Compte'");
      }
      if (this.epargneForm.controls['savingsDuration'].invalid) {
        console.log("Erreur dans le champ 'Durée du placement'");
      }
      if (this.epargneForm.controls['inputCapital'].invalid) {
        const errors = this.epargneForm.controls['inputCapital'].errors;
        console.log("Erreur dans le champ 'capital initial':", errors);
      }
      if (this.epargneForm.controls['savingsAmount'].invalid) {
        const errors = this.epargneForm.controls['savingsAmount'].errors;
        console.log("Erreur dans le champ 'Montant épargné':", errors);
      }
      if (!this.optionFrequency) {
        console.log("Sélectionnez au moins une option de fréquence de versement");
      }
    }
  }


}





