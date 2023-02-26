import {AssessmentCriteria} from "./assessment-criteria";

export class SelfCriticism {
    id!: string;
    description!: string;
    month!: number;
    year!: number;
    teacherId!: string;
    teacher!: string;
    submitDate!: string;
    isSubmitted!: boolean;
    createdDate!: string;
    user: any;
    userId!: string;
    assessmentCriterias!: AssessmentCriteria[];
    totalScore!: number;
}
