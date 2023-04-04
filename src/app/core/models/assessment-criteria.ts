import {AssessmentCriteriaGroup} from "./assessment-criteria-group";

export class AssessmentCriteria {
  id!: string;
  name!: string;
  description!: string;
  deductScore!: number;
  isDeduct!: boolean;
  value!: number;
  unit!: string;
  assessmentCriteriaGroupId!: string;
  quantity!: number;
  schoolId: string | any;
  allowUpdateScore!: boolean;
  totalScore!: number;
  actionDate: any;
  // temp
  assessmentCriteriaGroups: AssessmentCriteriaGroup[];
  assessmentCriteria1: any[];
  constructor() {
    this.allowUpdateScore = false;
    this.quantity = 1;
    this.actionDate = new Date();
    this.description = "";
    this.assessmentCriteriaGroups = [];
    this.assessmentCriteria1 = [];
  }
}
