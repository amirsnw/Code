// import { RequestTypeModel } from 'src/app/models/dynamic-request/request-type.model';
// export enum RequestStatusEnum {
//     CREATED,
//     PROCESSING_REQUEST,
//     PROCESSING_CORE,
//     COMPLETED,
//     DELIVERED
// }
export class CartablModel {
    id: number;
    workshopId: string;
    contractRow: string;
    // status: RequestStatusEnum;
    userName: string;
    status: string;
    branchCode: string;
    // creationTime: Date;
}
