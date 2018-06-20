import { Business } from './Business';
import { PayOutChannel } from './PayOutChannel';

export class Payout {
  public id: number;
  public currency: string;
  public amount: number;
  public payoutChannelid: number;
  public businessid: number;
  public deleted: boolean;
  public business: Business;
  public payOutChannel: PayOutChannel;
}
