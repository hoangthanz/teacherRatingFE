import {AssessmentCriteria} from "./assessment-criteria";
import {Teacher} from "./teacher";

export class SelfCriticism {
    index: number | any;
    id!: string;
    description!: string;
    month!: number;
    year!: number;
    teacherId!: string;
    teacher!: Teacher;
    submitDate!: string;
    isSubmitted!: boolean;
    createdDate!: string;
    user: any;
    userId!: string;
    assessmentCriterias!: AssessmentCriteria[];
    totalScore!: number;
}
