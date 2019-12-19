import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { BrowserDetails } from '../models/BrowserDetails';

@Injectable({
  providedIn: 'root',
})
export class AnyOldService {
  constructor(private http: HttpClient) {}

  getBrowserDetails(): Observable<BrowserDetails> {
    const resultObserver = new Subject<BrowserDetails>();

    this.http.get('https://httpbin.org/get').subscribe(
      data => {
        resultObserver.next(data as BrowserDetails);
      },
      err => {
        resultObserver.error(err);
      },
      () => resultObserver.complete()
    );

    return resultObserver;
  }

  postMessage(
    fileInput: FileList,
    progressEnabled: boolean
  ): Observable<string[]> {
    const resultObserver = new Subject<string[]>();

    // get large form data.
    const formData = new FormData();
    formData.append('file', fileInput.item(0), 'file-name-here.txt');

    // let formData = Large.largeData;

    // or use small form data.
    // const formData =
    //  '{ "message": "At the end of the day, this upload should work!", "status": "ready", "something": 2114 }';

    const uploadReq = new HttpRequest(
      'POST',
      //// 'http://localhost:3000/api/excel-reader-api/api/ReadColumnHeaders',
      'http://remote-server-name:3000/api/excel-reader-api/api/ReadColumnHeaders',
      formData,
      {
        reportProgress: progressEnabled,
      }
    );

    this.http.request(uploadReq).subscribe(
      event => {
        if (event.type === HttpEventType.Response) {
          resultObserver.next(event.body as string[]);
        } else if (event.type === HttpEventType.UploadProgress) {
          const newPercent = (event.loaded / event.total) * 100.0;
          // rem other signalling ... this.signalUploadChangeInPercent(newPercent);
        }
      },
      errorResponse => {
        resultObserver.error(errorResponse);
      },
      () => resultObserver.complete()
    );

    return resultObserver;
  }
}
