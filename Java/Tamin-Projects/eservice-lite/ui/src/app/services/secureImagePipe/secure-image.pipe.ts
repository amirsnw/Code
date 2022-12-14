import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'secureImage'
})
export class SecureImagePipe implements PipeTransform {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  transform(url: string) {

    return new Observable<string>((observer) => {
      observer.next('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
      const {next, error} = observer;
      this.http.get(url, {responseType: 'blob'}).subscribe(response => {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = function () {
          observer.next(reader.result);
        };
      });

      return {
        unsubscribe() {
        }
      };
    });
  }
}
