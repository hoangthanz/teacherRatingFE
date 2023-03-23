export class Criteria {
  id?: string;
  name?: string;
  deductScore?: any;
  isDeduct?: boolean;
  value?: number;
  unit?: string;
  assessmentCriteriaGroupId?: string;
  schoolId?: string;
  quantity?: number;

}

export class GradeConfiguration {
  id?: string;
  name?: string;
  description?: string;
  isDeleted?: boolean;
  minimumScore?: number;
  maximumScore?: number;

  schoolId?: string;


}
