import { RequestTypeModel } from 'src/app/models/dynamic-request/request-type.model';
export enum RequestStatusEnum {
    CREATED,
    PROCESSING_REQUEST,
    PROCESSING_CORE,
    COMPLETED,
    DELIVERED
}
export class PayPalModel {

    id: number;
    refCode: string;
    userName: string;
    status: RequestStatusEnum;
    title: string;
    comment: string;
    createdBy: string;
    creationTime: Date;
    lastModifiedBy: string;
    lastModificationTime: Date;
    requestType: RequestTypeModel;
    deliverCode: string;

}
