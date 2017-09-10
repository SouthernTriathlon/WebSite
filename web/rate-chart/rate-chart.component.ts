import { Component } from '@angular/core';

import * as moment from 'moment'

@Component({
  selector: "rate-chart",
  templateUrl: "rate-chart.component.html"
})
export class RateChartComponent {
  public isVisible(date: string) {
    return moment(date).isAfter(moment());
  }
}