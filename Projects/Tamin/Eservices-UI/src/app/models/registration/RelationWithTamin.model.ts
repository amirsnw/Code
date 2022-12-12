import { PersonalModel } from 'src/app/models/registration/personal.model';

export class RelationWithTaminModel {
     data: RelationWithTaminModel;
    id: number;
    insuranceId: string;
    dateOfStart: string;
    endReasonType: string;
    personal: PersonalModel;
    organizationId: string;
    workshopId: string;
    workshopName: string;
    relationWithTamin: any;
    job: string;
    creationTime: string;
    lastModificationTime: string;
    createdBy: string;
    lastModifiedBy: string;
}
