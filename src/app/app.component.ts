import { Component, Output, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
// const button = document.createElement('button');


export class AppComponent {

  public inputWage: number = 0;
  public inputKids: number = 0;
  // public input2: number = 0;
  
  public netWorth: number | string = 0;
  public HealthInsurance: number = 0;
  public SocialInsurance: number = 0;
  public IncomeTax: number = 0;
  public TaxDiscount: number = 0;
  public MinimalWage: number = 18900;
  public ErrorCatchPhrase: string = 'Zadejte mzdu vyšší než je minimální mzda ' + this.MinimalWage + ' Kč!';


  public numberOfKids: number[] = [1267, 1860, 2320];

  onClick() {
    this.calcHealthInsurance();
    this.calcSociaInsurance();
    this.calcIncomeTax();
    this.calcTaxDiscount();
    this.calcNetWorth();
    // this.errorCatchPhase();  
  }

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

  public calcIncomeTax() {
    if (this.inputWage > this.MinimalWage) {
    this.IncomeTax = Math.round(this.inputWage * 0.15);
    } else {
      this.IncomeTax = 0;
    }
  }

  public calcTaxDiscount() {
    if(this.inputWage > this.MinimalWage) {
      // Výpočet bez započtení dětí
      // this.TaxDiscount = 2570; 
      
      // Výpočet se započtením dětí
      if (this.inputKids = 0) {
        this.TaxDiscount = 2570;
      } else if (this.inputKids = 1) {
        this.TaxDiscount = 2570 + (this.numberOfKids[0]);
      } else if (this.inputKids = 2) {
        this.TaxDiscount = 2570 + (this.numberOfKids[0] + this.numberOfKids[1])
      } else {
        this.TaxDiscount = 2570 + (this.numberOfKids[0] + this.numberOfKids[1] + (this.numberOfKids[2]*(this.inputKids - 2)))
      }
    } else {
      this.TaxDiscount = 0;
    }
  }

  public calcNetWorth() {
    if(this.inputWage > this.MinimalWage) {
    // this.HealthInsurance = this.inputWage * 0.045;
    // this.SocialInsurance = this.inputWage * 0.071;
    // this.IncomeTax = this.inputWage * 0.15;
    this.netWorth = this.inputWage - this.HealthInsurance - this.SocialInsurance - this.IncomeTax + this.TaxDiscount;
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
