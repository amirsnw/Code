import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

declare let pdfjsLib: any;

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.css']
})
export class DocumentViewerComponent implements OnInit {
  @Input() width = '100%';
  @Input() height = '300px';
  @ViewChild('viewerElement') viewerElement: ElementRef;
  private url;
  zoom = 1;
  private contentType: 'pdf' | 'image';
  private thePdf: any;
  fitToPage = false;

  constructor() {
  }

  ngOnInit() {
  }

  loadPdfByUrl(url: string) {
    this.contentType = 'pdf';
    this.url = url;
    this.zoom = 1;
    this.internalLoadPdfByUrl(url);
  }

  loadImageByUrl(url: string) {
    this.contentType = 'image';
    this.url = url;
    this.zoom = 1;
    this.internalLoadImageByUrl(url);
  }

  private clearContent() {
    while (this.viewerElement.nativeElement.firstChild) {
      this.viewerElement.nativeElement.removeChild(this.viewerElement.nativeElement.firstChild);
    }
  }

  increaseZoom() {
    this.fitToPage = false;
    if (this.zoom <= 2) {
      this.zoom = this.zoom + .1;
    }
    if (this.contentType === 'pdf') {
      this.internalLoadPdfByUrl(this.url);
    }
    if (this.contentType === 'image') {
      this.internalLoadImageByUrl(this.url);
    }
  }

  decreaseZoom() {
    this.fitToPage = false;
    if (this.zoom > .2) {
      this.zoom = this.zoom - .1;
    }
    if (this.contentType === 'pdf') {
      this.internalLoadPdfByUrl(this.url);
    }
    if (this.contentType === 'image') {
      this.internalLoadImageByUrl(this.url);
    }
  }

  private internalLoadPdfByUrl(url) {
    this.clearContent();
    const me = this;
    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function (pdf) {
      // const thePdf = pdf;
      me.thePdf = pdf;
      const viewer = me.viewerElement.nativeElement;

      for (let page = 1; page <= pdf.numPages; page++) {
        const canvas = document.createElement('canvas');
        canvas.className = 'pdf-page-canvas';
        viewer.appendChild(canvas);
        // me.renderPdfPage(thePdf, page, canvas);
        me.renderPdfPage(me.thePdf, page, canvas);
      }
    });
  }

  private internalLoadImageByUrl(url) {
    this.clearContent();
    const img = document.createElement('img');
    img.src = url;
    img.style.width = (this.zoom * 100) + '%';
    const viewer = this.viewerElement.nativeElement;
    viewer.appendChild(img);
  }

  private renderPdfPage(thePdf, pageNumber, canvas) {
    const me = this;
    thePdf.getPage(pageNumber).then(function (page) {
      if (me.fitToPage) {
        const viewportTemp = page.getViewport(1.0);
        const viewer = me.viewerElement.nativeElement;
        if (viewportTemp.offsetWidth > viewportTemp.offsetHeight) {
          me.zoom = (viewer.offsetWidth - 40) / page.getViewport(1.0).width;
        } else {
          me.zoom = (viewer.offsetHeight - 40) / page.getViewport(1.0).height;
        }

        const viewport = page.getViewport(me.zoom);
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        page.render({canvasContext: canvas.getContext('2d'), viewport: viewport});
      } else {
        const viewport = page.getViewport(me.zoom);
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        page.render({canvasContext: canvas.getContext('2d'), viewport: viewport});
      }
    });
  }

  setFitToPage() {
    this.fitToPage = true;
    if (this.contentType === 'pdf') {
      this.internalLoadPdfByUrl(this.url);
    }
    if (this.contentType === 'image') {
      this.internalLoadImageByUrl(this.url);
    }

  }

  // fitToPage() {
  // const me = this;
  // if (this.contentType === 'pdf') {
  //   if (this.thePdf) {
  //     if (this.thePdf.numPages !== 0) {
  //       const containerWidth = this.viewerElement.nativeElement.offsetWidth;
  //       this.thePdf.getPage(1).then(function (page) {
  //         me.zoom = (containerWidth - 40) / page.getViewport(1.0).width;
  //         me.internalLoadPdfByUrl(me.url);
  //       });
  //     }
  //   }
  // }
  // if (this.contentType === 'image') {
  // }


  // }
}
