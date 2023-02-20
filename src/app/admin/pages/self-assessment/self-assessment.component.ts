import { Component } from '@angular/core';

@Component({
  selector: 'app-self-assessment',
  templateUrl: './self-assessment.component.html',
  styleUrls: ['./self-assessment.component.css']
})
export class SelfAssessmentComponent {

  public currentMonth = new Date().getMonth() + 1;
  constructor() {


  }

}
