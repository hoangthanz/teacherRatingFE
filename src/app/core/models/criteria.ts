import { CriteriaGroup } from "./criteria-group";

export class Criteria {
  id?: string;
  name?: string;
  createdDate?: string;
  updatedDate?: string;
  criteriaGroupId?: string;
  criteriaGroup?: CriteriaGroup;
}
