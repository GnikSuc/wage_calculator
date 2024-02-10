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

  public netWorth: number | string = 0;
  public HealthInsurance: number = 0;
  public SocialInsurance: number = 0;
  public InjuryInsurance: number = 0;
  public MinimalWage: number = 18900;
  public ErrorCatchPhrase: string = 'Zadejte mzdu vyšší než je minimální mzda ' + this.MinimalWage + ' Kč!';

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
  }



  // public calcSelectedDisability() {
  //   console.log("vybraná možnost: " + this.selectedDisability);
  //   if (this.selectedDisability === "DO") {
  //     this.TaxDiscountDisabled = 0;
  //   } else if(this.selectedDisability ==="D1") {
  //     this.TaxDiscountDisabled = 210;     
  //   } else if(this.selectedDisability === "D2") {
  //     this.TaxDiscountDisabled = 420;     
  //   } else if(this.selectedDisability === "D3") {
  //     this.TaxDiscountDisabled = 1345;     
  //   } else {
  //     this.TaxDiscountDisabled = 0;
  //   }
  // }
  // public calcSelectedDisability() {
  //   console.log("vybraná možnost: " + this.selectedDisability);
  //   this.onSelectDisability(event)
  // }  

  public calcHealthInsurance() {
    if (this.inputWage > this.MinimalWage) {
      this.HealthInsurance = Math.round(this.inputWage * 0.045);
    } else {
      this.HealthInsurance = 0;
    }
  }

  public calcSociaInsurance() {
    if (this.inputWage > this.MinimalWage) {
    this.SocialInsurance = Math.round(this.inputWage * 0.071);
    } else {
      this.SocialInsurance = 0;
    }
  }

  public calcInjuryInsurance() {
    if (this.inputWage > this.MinimalWage) {
      this.InjuryInsurance = Math.round(this.inputWage * 0.006);
      } else {
        this.SocialInsurance = 0;
      }
  }

  //131901
  public calcIncomeTax() {
    if (this.inputWage > this.MinimalWage && this.inputWage < this.IncomeTaxRich) {
    this.IncomeTax = Math.round(this.inputWage * 0.15);
    } else if(this.inputWage >= this.IncomeTaxRich) {
    this.IncomeTax = Math.round(this.inputWage * 0.23);
    this.IncomeTaxPhrase = '(23 %) Solidární daň';
    } else {
    this.IncomeTax = 0;
    }
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
  }



  public calcTaxDiscount() {
    if(this.inputWage > this.MinimalWage) {
      let kids = this.inputNumKids + this.inputNumKidsHandy;
      this.TaxDiscountDisabled = Number(this.eventDisabled);
      this.TaxDiscount = 2570 + this.TaxDiscountDisabled;
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
    // this.HealthInsurance = this.inputWage * 0.045;
    // this.SocialInsurance = this.inputWage * 0.071;
    // this.IncomeTax = this.inputWage * 0.15;
    this.netWorth = this.inputWage - this.HealthInsurance - this.SocialInsurance - this.InjuryInsurance - this.IncomeTax + this.TotalTaxDiscount;
    } else {
      this.netWorth = this.ErrorCatchPhrase;
    }
  }

  // public errorCatchPhase() {
  //   if (this.inputWage > this.MinimalWage) {
  //     this.ErrorCatchPhase = '';
  //   } else {
  //     this.ErrorCatchPhase;
  //   }
  // } 
}
