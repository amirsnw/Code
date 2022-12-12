import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {TaminLazyLoadService, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../settings/urls';

import {Subscription} from 'rxjs';

declare let L: any;

@Component({
  selector: 'app-all-sso-locations',
  templateUrl: './all-sso-locations.component.html',
  styleUrls: ['./all-sso-locations.component.css']
})
export class AllSsoLocationsComponent extends TaminPageBaseComponent {
  private mapRef: any;
  id: any;
  map: any;
  _overlay: any;
  // directionRef: any;
  directionRefVehicle: any;
  directionRefFoot: any;
  userLocationRef: any;

  @ViewChild('theMap') theMap: ElementRef;

  private _subscription = new Subscription();

  constructor(injector: Injector, private taminLazyLoadService: TaminLazyLoadService) {
    super(injector);
  }

  protected initializePage(): void {
    this.id = (new Date()).getTime().toString();
  }

  protected loadPageData(): void {
    const me = this;
    this.map = L.map(this.id).setView([32.348232, 52.107229], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(me.map);
    me.map.on('click', me.onMapClicked.bind(this));

    const icon = L.icon({
      iconUrl: 'assets/icons/map-marker-icon.png',
      iconSize: [24, 24]
    });

    this.restService.getAll(Urls.MAP_ALL__BRANCHES_GEO_UNIT)
      .then(value => {
        (value.data.list as Array<any>).forEach(value1 => {
          const name = value1.name != null ? value1.name : '';
          const address = value1.address != null ? value1.address : '';
          const tel = value1.tel != null ? value1.tel : '';
          const tooltip = `<b>${this.getPersianNumber(name)}</b><br><span>${this.getPersianNumber(address)}</span><br><span>${this.getPersianNumber(tel)}</span>`;
          L.marker([value1.lat, value1.long], {icon: icon}).bindTooltip(tooltip, {direction: 'top', offset: L.point(0, -14)}).addTo(me.map);
        });
      })
      .catch(reason => {
      });
  }

  private setPosition(location: any) {
    const me = this;
    if (this.directionRefFoot) {
      me.map.removeLayer(this.directionRefFoot);
    }
    if (this.directionRefVehicle) {
      me.map.removeLayer(this.directionRefVehicle);
    }
    if (this.userLocationRef) {
      me.map.removeLayer(this.userLocationRef);
    }
    me._overlay = me.showOverlay(me.theMap.nativeElement);
    const icon = L.icon({
      iconUrl: 'assets/icons/user2-shadow32x32.png',
      iconSize: [32, 32]
    });
    this.userLocationRef = L.marker([location.latlng.lat, location.latlng.lng], {icon: icon}).addTo(me.map);

    this.restService.getAll(`${Urls.MAP_ALL_GEO_BRANCH_VEHICLE}?lat1=${location.latlng.lat}&lon1=${location.latlng.lng}&flag=1`)
      .then(value => {
        this.directionRefVehicle = L.polyline(this.decodePath(value.data.points, false), {color: 'red', weight: 6}).addTo(me.map);
        this.restService.getAll(`${Urls.MAP_ALL_GEO_BRANCH_FOOT}?lat1=${location.latlng.lat}&lon1=${location.latlng.lng}&flag=1`)
          .then(value1 => {
            this.hideOverlay(this._overlay);
            this.directionRefFoot = L.polyline(this.decodePath(value1.data.points, false), {color: 'blue', weight: 3}).addTo(me.map);
          })
          .catch(reason => {
            this.hideOverlay(this._overlay);
          });
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
      });



  }

  private onMapClicked() {
    this.setPosition(arguments[0]);
  }

  private decodePath(encoded, is3D) {
    /* tslint:disable */
    const len = encoded.length;
    let index = 0;
    const array = [];
    let lat = 0;
    let lng = 0;
    let ele = 0;

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const deltaLat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += deltaLat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const deltaLon = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += deltaLon;

      if (is3D) {
        // elevation
        shift = 0;
        result = 0;
        do {
          b = encoded.charCodeAt(index++) - 63;
          result |= (b & 0x1f) << shift;
          shift += 5;
        } while (b >= 0x20);
        const deltaEle = ((result & 1) ? ~(result >> 1) : (result >> 1));
        ele += deltaEle;
        // array.push([lng * 1e-5, lat * 1e-5, ele / 100]);
        array.push([lat * 1e-5, lng * 1e-5, ele / 100]);
      } else {
        // array.push([lng * 1e-5, lat * 1e-5]);
        array.push([lat * 1e-5, lng * 1e-5]);
      }
    }
    return array;
  }
}
