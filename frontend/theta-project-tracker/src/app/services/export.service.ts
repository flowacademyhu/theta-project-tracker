import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ExportsService {
  apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public exportReport(start, end, array, route, isUser: boolean) {
    let params: HttpParams = new HttpParams();
    params = params.append('from', start);
    params = params.append('to', end);
    if (array.length !== 0) {
      params = params.append('projects', JSON.stringify(array.map(i => i.id)));
    }
    this.http.get(this.apiUrl + 'export' + route, { params, responseType: 'blob' }).subscribe((blob) => {
      this.downloadFile(blob);
    });
  }

  private downloadFile(data: Blob) {
    // create blob
    let newBlob;

    // set application type
    newBlob = new Blob([data], {type: 'application/vnd.ms-excel'});

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob, 'export.xlsx');
      return;
    }

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const downloadableData = window.URL.createObjectURL(newBlob);

    const link = document.createElement('a');
    link.href = downloadableData;
    link.download = 'export.xlsx';
    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

    // tslint:disable-next-line:only-arrow-functions
    setTimeout(function() {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(downloadableData);
      link.remove();
    }, 100);
  }
}
