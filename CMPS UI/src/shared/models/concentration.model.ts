import { Course } from "./course.model";

export class Concentration {
    concentrationCode: number;
	name: string;
	courses: Map<number, Course>;
	createdBy: string;
	dateCreated: Date;
	modifiedBy: string;
	dateModified: Date;
}