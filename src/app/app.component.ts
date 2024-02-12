import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { throwError } from 'rxjs';
import { __values } from 'tslib';

interface Disability {
  id: string;
  name: string;   
  value: number;
} 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
// const button = document.createElement('button');

export class AppComponent {

  public inputWage: number = 0;
  public inputNumKids: number = 0;
  public inputNumKidsHandy: number = 0;

  public disabilities: Disability[] = [
    {id: "D0", name: "Žádná", value: 0},
    {id: "D1", name: "Částečná invalidita", value: 210},
    {id: "D2", name: "Plná invalidita", value: 420},  
    {id: "D3", name: "Držitel ZTP/P", value: 1345}
  ];

  public eventDisabled: number = 0;
  onSelectDisability(event: number) {
    this.eventDisabled = (event);
  }

  public NetWorth: number | string = 0;
  public HealthInsurance: number = 0;
  public SocialInsurance: number = 0;
  public InjuryInsurance: number = 0;
  public MinimalWage: number = 18900;
  public ErrorCatchPhrase: string = '';

  public TaxDiscount: number = 0;
  public TaxDiscountKids: number = 0;
  public TaxDiscountKidsHandy: number = 0;
  public TotalTaxDiscountKids: number = 0;
  public TaxDiscountDisabled: number = 0;
  public TotalTaxDiscount: number = 0;

  public taxOfKids: number[] = [1267, 1860, 2320];
  public taxOfKidsHandy: number[] = [2534, 3720, 4640];

  public IncomeTax: number = 0;
  public IncomeTaxRich: number = 131901;
  public IncomeTaxPhrase: string = '(15 %)';

  public HealthInsuranceEmployer: number = 0;
  public SocialInsuranceEmployer: number = 0;
  public TotalEmployerExpense: number = 0;

  public NetWorth_F: string = '0';
  public HealthInsurance_F: string = '0';
  public SocialInsurance_F: string = '0';
  public InjuryInsurance_F: string = '0';
  public IncomeTax_F: string = '0';
  public TaxDiscount_F: string = '0';
  public TotalTaxDiscountKids_F: string = '0';
  public HealthInsuranceEmployer_F: string = '0';
  public SocialInsuranceEmployer_F: string = '0';
  public TotalEmployerExpense_F: string = '0';

  onClick() {
    // this.calcSelectedDisability();
    this.calcHealthInsurance();
    this.calcSociaInsurance();
    this.calcInjuryInsurance();
    this.calcIncomeTax();
    this.calcKidsTaxDiscount();
    this.calcKidsHandyTaxDiscount();
    this.countTaxKids();
    this.calcTaxDiscount();
    this.calcNetWorth();
    this.calcHealthInsuranceEmployer();
    this.calcSocialInsuranceEmployer();
    this.calcTotalValueOfPerson();
  }

  public calcHealthInsurance() {
    if (this.inputWage > this.MinimalWage) {
      this.HealthInsurance = Math.round(this.inputWage * 0.045);
      this.HealthInsurance_F = this.HealthInsurance.toLocaleString() + ' Kč';
    } else {
      this.HealthInsurance_F;
    }
  }

  public calcSociaInsurance() {
    if (this.inputWage > this.MinimalWage) {
    this.SocialInsurance = Math.round(this.inputWage * 0.065);
    this.SocialInsurance_F = this.SocialInsurance.toLocaleString() + ' Kč';
    } else {
      this.SocialInsurance_F;
    }
  }

  public calcInjuryInsurance() {
    if (this.inputWage > this.MinimalWage) {
      this.InjuryInsurance = Math.round(this.inputWage * 0.006);
      this.InjuryInsurance_F = this.InjuryInsurance.toLocaleString() + ' Kč';
      } else {
        this.InjuryInsurance_F;
      }
  }

  //131901
  public calcIncomeTax() {
    this.IncomeTax = Math.round(this.inputWage * 0.15);
    if (this.inputWage > this.MinimalWage && this.inputWage < this.IncomeTaxRich) {
    this.IncomeTax;
    } else if(this.inputWage >= this.IncomeTaxRich) {
    this.IncomeTax = Math.round(this.IncomeTax + ((this.inputWage - 131901) * 0.07));
    this.IncomeTaxPhrase = '(15% + 23 % Solidární daň)';
    } else {
    this.IncomeTax = 0;
    }
    this.IncomeTax_F = this.IncomeTax.toLocaleString() + ' Kč';
  }

  public calcKidsTaxDiscount() {
    if (this.inputNumKids === 1) {
      this.TaxDiscountKids = this.taxOfKids[0];
    } else if (this.inputNumKids === 2) {
      this.TaxDiscountKids = this.taxOfKids[0] + this.taxOfKids[1];
    } else if (this.inputNumKids > 2) {
      this.TaxDiscountKids = this.taxOfKids[0] + this.taxOfKids[1] + (this.taxOfKids[2]*(this.inputNumKids - 2));
    } else {
      this.TaxDiscountKids = 0;
    }
  }

  public calcKidsHandyTaxDiscount() {
    if (this.inputNumKidsHandy === 1) {
      this.TaxDiscountKidsHandy = this.taxOfKidsHandy[0];
    } else if (this.inputNumKidsHandy === 2) {
      this.TaxDiscountKidsHandy = this.taxOfKidsHandy[0] + this.taxOfKidsHandy[1];
    } else if (this.inputNumKidsHandy > 2) {
      this.TaxDiscountKidsHandy = this.taxOfKidsHandy[0] + this.taxOfKidsHandy[1] + (this.taxOfKidsHandy[2]*(this.inputNumKidsHandy - 2));
    } else {
      this.TaxDiscountKidsHandy = 0;
    }
  }

  public countTaxKids() {
    this.TotalTaxDiscountKids = this.TaxDiscountKids + this.TaxDiscountKidsHandy;
    this.TotalTaxDiscountKids_F = this.TotalTaxDiscountKids.toLocaleString() + ' Kč';
  }

  public calcTaxDiscount() {
    if(this.inputWage > this.MinimalWage) {
      let kids = this.inputNumKids + this.inputNumKidsHandy;
      this.TaxDiscountDisabled = Number(this.eventDisabled);
      this.TaxDiscount = 2570 + this.TaxDiscountDisabled;
      this.TaxDiscount_F = this.TaxDiscount.toLocaleString() + ' Kč';
      console.log(this.eventDisabled)
      if (kids < 1) {
        this.TotalTaxDiscount = this.TaxDiscount + this.TaxDiscountDisabled;
      } else {
        this.TotalTaxDiscount = this.TaxDiscount + this.TotalTaxDiscountKids + this.TaxDiscountDisabled;
      } 
    } else {
      this.TotalTaxDiscount = 0;
    }
  }

  public calcNetWorth() {
    if(this.inputWage > this.MinimalWage) {
    this.NetWorth = this.inputWage - this.HealthInsurance - this.SocialInsurance - this.InjuryInsurance - this.IncomeTax + this.TotalTaxDiscount;
    this.NetWorth_F = this.NetWorth.toLocaleString() + ' Kč';
    this.ErrorCatchPhrase = '';
  } else {
      this.NetWorth_F = '';
      this.ErrorCatchPhrase = 'Výsledek je nižší než MIN mzda: ' + this.MinimalWage + ' Kč!';
      }
  }

  public calcHealthInsuranceEmployer() {
    this.HealthInsuranceEmployer = Math.round(this.inputWage * 0.09);
    this.HealthInsuranceEmployer_F = this.HealthInsuranceEmployer.toLocaleString() + ' Kč';
  }

  public calcSocialInsuranceEmployer() {
    this.SocialInsuranceEmployer = Math.round(this.inputWage * 0.248);
    this.SocialInsuranceEmployer_F = this.SocialInsuranceEmployer.toLocaleString() + ' Kč';
  }

  public calcTotalValueOfPerson() {
    this.TotalEmployerExpense = this.inputWage + this.HealthInsuranceEmployer + this.SocialInsuranceEmployer;
    this.TotalEmployerExpense_F = this.TotalEmployerExpense.toLocaleString() + ' Kč';
  }
}
  