import { Component } from '@angular/core';
import { SelfCriticism } from '../../../../../core/models/self-criticism';

@Component({
  selector: 'app-view-sefl-assessment',
  templateUrl: './view-sefl-assessment.component.html',
  styleUrls: ['./view-sefl-assessment.component.css'],
})
export class ViewSeflAssessmentComponent {
  selfAssessmentList: SelfCriticism = new SelfCriticism();
  constructor() {}
}
