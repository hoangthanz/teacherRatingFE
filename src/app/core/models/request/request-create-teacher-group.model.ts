export class RequestCreateTeacherGroupModel {
  id?: string;
  name?: string;
  teacherIds?: string[] = [];
  period1Score?: number;
  period2Score?: number;
  yearScore?: number;
  schoolId?: string;
  totalMember?: number;
  description?: string;
  isDeleted?: boolean;
  leaderId?: string;
}
