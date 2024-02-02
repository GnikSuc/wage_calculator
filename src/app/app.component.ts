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

export class AppComponent {
  public netWorth: number = 0;
  public input: number = 0;
  public HealthInsurance: number = 0;
  public SocialInsurance: number = 0;
  public IncomeTax: number = 0;
  public TaxDiscount: number = 2570;


  public calcHealthInsurance() {
    this.HealthInsurance = Math.round(this.input * 0.045);
  }

  public calcSociaInsurance() {
    this.SocialInsurance = Math.round(this.input * 0.071);
  }

  public calcIncomeTax() {
    this.IncomeTax = Math.round(this.input * 0.15);
  }

  public calcNetWorth() {
    this.HealthInsurance = this.input * 0.045;
    this.SocialInsurance = this.input * 0.071;
    this.IncomeTax = this.input * 0.15;
    this.netWorth = this.input - this.HealthInsurance - this.SocialInsurance - this.IncomeTax + this.TaxDiscount;
  }
}
