

import { BusinessUser } from './BusinessUser';


export class AuthToken {
    public id: number;
    public token: string;
    public validUntil: Date;
    public businessUserid: number;
    public businessUser: BusinessUser;
}
