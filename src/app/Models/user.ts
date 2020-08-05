import { Base } from './base';

export class User extends Base {
    userId: number;
    userName: string;
    password: string;
    fullName: string; 
    token: string;
}
