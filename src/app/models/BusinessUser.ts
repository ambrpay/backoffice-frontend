import { Business } from './Business';

export enum BusinessUserType {
    Owner = 1,
    Admin = 2 ,
    Accountant = 3,
}

export class BusinessUser {
    public id: number;
    public title: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public emailVerified: boolean;
    public password: string;
    public verificationCode: string;
    public userType: BusinessUserType;
    public deleted: boolean;
    public businessid: number;
    public business: Business;
}
