import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-reloader',
  templateUrl: './reloader.component.html',
  styleUrls: ['./reloader.component.css']
})
export class ReloaderComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params['ref'] !== null) {
      const tmp = decodeURIComponent(this.activatedRoute.snapshot.params['ref']).replace('{', '').replace('}', '');
       this.router.navigate([tmp]);
    }
  }

}
