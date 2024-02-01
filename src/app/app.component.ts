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

  constructor() {}

  public calcNetWorth() {
    console.log(this.input);
    let HealthInsurance: number = this.input * 0.045;
    let SocialInsurance: number = this.input * 0.071;
    let IncomeTax: number = this.input * 0.15;
    let TaxDiscount: number = 2570;
    this.netWorth = this.input - HealthInsurance - SocialInsurance - IncomeTax + TaxDiscount;
  }

}
