import { PersonalModel } from 'src/app/models/registration/personal.model';

export class ContactModel {data: ContactModel;
    id: number;
    address: string;
    dateOfStart: string;
    zipCode: string;
    phoneNumber: string;
    mobile: string;
    cityId: string;
    personal: PersonalModel;
}
