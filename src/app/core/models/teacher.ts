import { AssessmentRecord } from './assessment-record';

export class Teacher {
  id?: string;
  description?: string;
  name?: string;
  phoneNumber?: string;
  email?: string;
  assessmentRecords?: AssessmentRecord[] = [];
  userId?: string;
  groupId?: string;
  user?: any;
  schoolId?: string | any;
}
