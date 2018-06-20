import { Business } from './Business';
import { Customer } from './Customer';
import { Subscription } from './Subscription';
import { PayInChannel } from './PayInChannel';

export class Payment {
  public id: number;
  public sourceCurrency: string;
  public destinationCurrency: string;
  public amount: number;
  public rate: number;
  public payInChannelid: number;
  public subscriptionid: number;
  public customerid: number;
  public businessid: number;
  public createdAt: Date;
  public deleted: boolean;
  public business: Business;
  public customer: Customer;
  public subscription: Subscription;
  public payInChannel: PayInChannel;
}
