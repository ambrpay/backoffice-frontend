import { Business } from './Business';

export class PayOutChannel {
    public id: number;
    public currency: string;
    public deleted: boolean;
    public businessid: number;
    public business: Business;
    public data: any;
}
