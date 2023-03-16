import { Teacher } from './teacher';
import { AssessmentCriteriaGroup } from './assessment-criteria-group';

export class School {
  id!: string;
  name!: string;
  description!: string;
  address: string | any;
  teachers: Teacher[] | any;
  assessmentGroups: AssessmentCriteriaGroup[] | any;
}
