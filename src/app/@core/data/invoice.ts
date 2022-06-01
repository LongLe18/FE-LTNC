import { Observable } from 'rxjs';

export abstract class InvoiceData {
    abstract getListInvoices(): Observable<any>;
    abstract getListInvoices2(): Observable<any>;
    abstract getInvoiceById(id): Observable<any>;
    abstract changeStatusInvoice(id, status): Observable<any>;
    abstract getDetailInvoice(idInvoice): Observable<any>;
}
