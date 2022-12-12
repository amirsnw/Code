import { RequestTypeModel } from 'src/app/models/dynamic-request/request-type.model';

export enum RequestStatusEnum {
    CREATED,
    PROCESSING_REQUEST,
    PROCESSING_CORE,
    COMPLETED,
    DELIVERED
}

export class RequestModel {
    id: number;
    refCode: string;
    userName: string;
    status: any;
    title: string;
    comment: string;
    createdBy: string;
    creationTime: Date;
    lastModifiedBy: string;
    lastModificationTime: Date;
    requestType: RequestTypeModel;
    deliverCode: string;
    refrenceid: string;
}
