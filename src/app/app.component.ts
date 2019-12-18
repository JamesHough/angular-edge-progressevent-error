import { Component, ViewChild, ElementRef } from '@angular/core';
import { AnyOldService } from './services/any-old.service';
import { BrowserDetails } from './models/BrowserDetails';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Edge Browser ProgressEvent Error';

  browserDetails: BrowserDetails;

  stringResponse: string[];

  progressEnabled: boolean;

  @ViewChild('fileUpload', { static: true }) fileUploadControl: ElementRef;

  constructor(private anyOldService: AnyOldService) {}

  getBrowser(): void {
    this.stringResponse = undefined;
    this.browserDetails = undefined;

    this.anyOldService.getBrowserDetails().subscribe(
      data => (this.browserDetails = data),
      err => {
        console.error('Failed to call the REST service', err);
        alert('Failed to call the REST service. JS Console has error details.');
      }
    );
  }

  postMessage(): void {
    this.stringResponse = undefined;
    this.browserDetails = undefined;

    if (this.fileUploadControl.nativeElement.files.length === 0) {
      alert('select a file to upload');
      return;
    }
    
    this.anyOldService
      .postMessage(
        this.fileUploadControl.nativeElement.files,
        this.progressEnabled
      )
      .subscribe(
        data => (this.stringResponse = data),
        err => {
          console.error('Failed to call the REST service', err);
          alert(
            'Failed to call the REST service. JS Console has error details.'
          );
        }
      );
  }
}
