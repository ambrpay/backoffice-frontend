import { SubscriptionPlan } from './SubscriptionPlan';
import { Customer } from './Customer';


export class Subscription {
    public id: number;
    public currency: string;
    public subscribedAt: Date;
    public deleted: boolean;
    public subscriptionPlanid: number;
    public customerid: number;
    public subscriptionPlan: SubscriptionPlan;
    public customer: Customer;
}
