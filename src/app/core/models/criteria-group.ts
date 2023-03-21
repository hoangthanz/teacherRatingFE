export class CriteriaGroup {
  id: string;
  name?: string;
  createdDate?: string;
  updatedDate?: string;
  description?: string;
  schoolId?: string;
  constructor() {
    this.name = "";
    this.id = "";
    this.createdDate = "";
    this.updatedDate = "";
  }
}
