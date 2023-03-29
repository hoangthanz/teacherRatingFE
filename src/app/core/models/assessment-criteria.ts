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
}
