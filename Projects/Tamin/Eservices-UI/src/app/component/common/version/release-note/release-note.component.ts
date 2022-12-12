import { Component, OnInit } from '@angular/core';
import { TaminPageBaseComponent } from 'tamin-framework';
import { ReleaseNoteModel } from 'src/app/models/version/release-note.model';

@Component({
  selector: 'app-release-note',
  templateUrl: './release-note.component.html',
  styleUrls: ['./release-note.component.css']
})
export class ReleaseNoteComponent  extends TaminPageBaseComponent {

  releaseNotes: Array<ReleaseNoteModel> = [];

  initializePage() {
    this.restService.getAll('assets/data/version-data.json')
    .then(data => {
      this.releaseNotes = data.data.items;
      this.releaseNotes.reverse();
    })
    .catch(error => {
    });
  }
}
