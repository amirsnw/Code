import { RequestModel } from 'src/app/models/dynamic-request/request.model';
import { DocumentFileModel } from './document-file.model';

export class RequestDocumentModel {data: RequestDocumentModel;
    id: number;
    request: RequestModel;
    documentFile: DocumentFileModel;
    documentType: string;
}
