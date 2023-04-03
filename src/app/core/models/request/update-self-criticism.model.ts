import {AssessmentCriteria} from "../assessment-criteria";

export class UpdateSelfCriticismModel {
  id!: string;
  description!: string;
  month!: number;
  year!: number;
  submitDate!: string;
  isSubmitted!: boolean;
  createdDate!: string;
  user: any;
  userId!: string;
  assessmentCriterias!: AssessmentCriteria[];
  totalScore!: number;
  schoolId!: string;
}
