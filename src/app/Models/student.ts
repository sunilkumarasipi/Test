import { Base } from './base';

export class Student extends Base {
    studentId: number;
    name: string;
    code: string;
    address: string;
    class: string;
    dateOfBirth: Date;
    gender: string;
    schoolId: number;
    schoolName: string;
    guardianName: string;
    mobile: string;
    email: string;
    fees: number;
    photo: string;
    comments:string;
}