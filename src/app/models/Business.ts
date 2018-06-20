import { BusinessUser } from './BusinessUser';
import { PayInChannel } from './PayInChannel';
import { SubscriptionPlan } from './SubscriptionPlan';

export class Business {
    public id: number;
    public name: string;
    public taxcode: string;
    public website: string;
    public phone: string;
    public address: string;
    public city: string;
    public zip: string;
    public country: string;
    public deleted: boolean;
    public businessUsers: BusinessUser[];
    public payInChannels: PayInChannel[];
    public subscriptionPlans: SubscriptionPlan[];
}
