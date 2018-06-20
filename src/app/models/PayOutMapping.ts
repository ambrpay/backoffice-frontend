import { PayInChannel } from './PayInChannel';
import { PayOutChannel } from './PayOutChannel';
export class PayOutMapping {
  public id: number;
  public payInChannelid: number;
  public payOutChannelid: number;
  public payInChannel: PayInChannel;
  public payOutChannel: PayOutChannel;
}
