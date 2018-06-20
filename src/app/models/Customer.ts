import { Subscription} from './Subscription';


export class Customer  {
    public id: number;
    public title: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public emailVerified: boolean;
    public EthAddress: string;
    public address: string;
    public city: string;
    public zip: string;
    public country: string;
    public kyc: boolean;
    public deleted: boolean;
    public subscriptions: Subscription[];
}
