import { PersonalModel } from 'src/app/models/registration/personal.model';

export class AccountModel {data: AccountModel;
    id: number;
    accountNumber: string;
    dateOfStart: string;
    bank: any;
    accounttype: any;
    personal: PersonalModel;
}
