import { Observable } from 'rxjs';

export abstract class InputData {
    abstract getListReceipts(): Observable<any>;
    abstract getReceiptById(id): Observable<any>;
    abstract getReceiptDetailById(id): Observable<any>;
    abstract addReceipt(data): Observable<any>;
    abstract deleteReceipt(idInvoice): Observable<any>;

    abstract dashboard(data): Observable<any>;
    abstract dashboard2(id): Observable<any>;
}
