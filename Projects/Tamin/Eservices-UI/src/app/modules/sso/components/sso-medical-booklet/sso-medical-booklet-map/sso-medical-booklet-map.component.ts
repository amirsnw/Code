import { Component,  ElementRef, EventEmitter, Injector, Input, Output, ViewChild} from '@angular/core';
import {OverlayService, SearchOperator, SearchParam, TaminLazyLoadService, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../../../../../settings/urls';


declare let L: any;
declare let html2canvas: any;
@Component({
  selector: 'app-sso-medical-booklet-map',
  templateUrl: './sso-medical-booklet-map.component.html',
  styleUrls: ['./sso-medical-booklet-map.component.css']
})
export class SsoMedicalBookletMapComponent extends TaminPageBaseComponent {
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('divTemp') divTemp: ElementRef;
  @ViewChild('theMap') theMap: ElementRef;
  @Input() width = '100%';
  @Input() height = '600px';
  @Output() confirmed = new EventEmitter<any>();

  private destination: any;
  branchLocationMarker: any;
  private source = [];
  selectedBranch: any;
  distance: any;
  deliveryCost: any;
  deliveryCompany: any;
  deliveryCompanyDesc: any;
  userLocationMarker: any;
  private overlayService: OverlayService;


  private sourceMarkerRef: any;
  private targetMarkerRef: any;
  private directionRef: any;

  id: any;
  private map: any;
  private _overlay: any;
  summary = {
    branchName: '',
    branchAddress: '',
    branchTel: '',
    distance: '',
    deliveryCost: '',
    deliveryCompany: '',
    deliveryCompanyDesc: ''
  };
  private markers = {
    source: L.icon({iconUrl: 'assets/icons/user2-shadow32x32.png', iconSize: [32, 32]}),
    target: L.icon({iconUrl: 'assets/icons/buillding2-32x32.png', iconSize: [24, 24]})
  };
  defaultCenter = [35.701121, 51.368159];
  private OsmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  constructor(injector: Injector, private taminLazyLoadService: TaminLazyLoadService, private httpClient: HttpClient) {
    super(injector);
    this.overlayService = injector.get(OverlayService);
  }

  cleanUpMap() {
    if (this.sourceMarkerRef) {
      this.map.removeLayer(this.sourceMarkerRef);
    }

    if (this.targetMarkerRef) {
      this.map.removeLayer(this.targetMarkerRef);
    }
    if (this.directionRef) {
      this.map.removeLayer(this.directionRef);
    }
  }

  cleanUpSummary() {
    this.summary = {
      branchName: '',
      branchAddress: '',
      branchTel: '',
      distance: '',
      deliveryCost: '',
      deliveryCompany: '',
      deliveryCompanyDesc: ''
    };
  }

  private setPosition(location: any) {
    const me = this;
    me.cleanUpMap();
    me.cleanUpSummary();
    me.sourceMarkerRef = L.marker(location.latlng, {icon: me.markers.source}).addTo(me.map);
    if (this.directionRef) {
      this.map.removeLayer(this.directionRef);
    }
    me._overlay = me.showOverlay(me.theMap.nativeElement);
    this.restService.getAll(`${Urls.GEO_PATH_INFO}?lat1=${location.latlng.lat}&lon1=${location.latlng.lng}`)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.directionRef = L.polyline(this.decodePath(value.data.points, false), {color: 'red'}).addTo(this.map);
        this.summary.branchName = value.data.branch.name;
        this.summary.branchAddress = value.data.branch.address;
        this.summary.branchTel = value.data.branch.tel;
        this.distance = value.data.distance;
        this.deliveryCost = value.data.price;
        this.deliveryCompany = value.data.typeCode;
        this.deliveryCompanyDesc = value.data.typeDesc;
        this.summary.distance = (value.data.distance).toString() + ' متر ';
        this.summary.deliveryCost = value.data.price.toString() + ' ریال ';
        this.summary.deliveryCompany = value.data.typeCode;
        this.summary.deliveryCompanyDesc = value.data.typeDesc;
        this.selectedBranch = value.data.branch.code;
        const tooltip = `<b>${me.getPersianNumber(me.summary.branchName)}</b><br><span>${me.getPersianNumber(me.summary.branchAddress)}</span><br><span>${me.getPersianNumber(me.summary.branchTel)}</span>`;
        this.targetMarkerRef = L.marker([value.data.branch.lat, value.data.branch.long], {icon: me.markers.target})
          .bindTooltip(tooltip, {direction: 'top', offset: L.point(0, -14)})
          .addTo(this.map);
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
      });

  }


  private onMapClicked() {
    this.destination = [arguments[0].latlng.lat, arguments[0].latlng.lng];
    this.setPosition(arguments[0]);
  }


  private initializeMap(center: Array<number>) {
    const me = this;

    if (!me.map) {
      me.map = L.map(this.id, {attributionControl: false, zoomControl: true}).setView(center, 18);
      L.tileLayer(me.OsmUrl).addTo(me.map);
      me.map.on('click', me.onMapClicked.bind(this));
      // me.map = null;
      // this.theMap.innerHtml = '';
    } else {
      this.cleanUpMap();
      this.cleanUpSummary();
      me.map.panTo(center);
    }
  }

  open(cityCode: string) {
    const me = this;
    // me.map = null;
    me.theModal.show();
    this.getCenter(cityCode)
      .then(value => {
        me.initializeMap(value);
      })
      .catch(reason => {
      });
  }

  close() {
    this.theModal.hide();
  }

  protected initializePage(): void {
    this.id = (new Date()).getTime().toString();
    this.userLocationMarker = L.icon({
      iconUrl: 'assets/icons/user2-shadow32x32.png',
      iconSize: [32, 32],
    });

    this.branchLocationMarker = L.icon({
      iconUrl: 'assets/icons/building-icon.png',
      iconSize: [24, 24],
    });

  }

  protected loadPageData(): void {
    // this.open('');
  }

  private getNearestBranch(location: Array<number>) {
    return new Promise<any>((resolve, reject) => {
      const theUrl = [
        Urls.GEO_NEAREST_BRANCH,
        '?lat1=',
        location[0],
        '&lon1=',
        location[1]
      ].join('');

      this.restService.getAll(theUrl)
        .then(value => {
          resolve(value);
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }

  getCenter(cityCode: string): Promise<Array<number>> {
    return new Promise<Array<number>>((resolve, reject) => {
      if (cityCode === null || cityCode === undefined || cityCode === '') {
        resolve(this.defaultCenter);
        return;
      }
      const searchParam = new SearchParam();
      searchParam.property = 'cityCode';
      searchParam.operator = SearchOperator.EQUAL;
      searchParam.value = cityCode;

      this.restService.getAll(Urls.BRANCH_GEO, [searchParam])
        .then(value => {
          resolve([value.data.list[0].lat, value.data.list[0].long]);
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }

  decodePath(encoded, is3D) {
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
    /* tslint:enable */
  }

  saveData() {
    this._overlay = this.overlayService.show();
    this.createMapImage();

  }

  private createMapImage(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const me = this;
      const imageContainer = document.createElement('div');
      imageContainer.id = (new Date()).getTime().toString();
      imageContainer.setAttribute('style', 'width: 190mm; height: 120mm; direction:ltr; border: solid 1px #cacaca; visibility:hidden');
      document.body.appendChild(imageContainer);
      const map = L.map(imageContainer.id, {zoomControl: false, attributionControl: false}).setView(me.destination, 16);
      const layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      const icon = L.divIcon({
        className: 'div-icon',
        iconSize: null,
      });

      L.marker(me.destination, {icon: icon}).addTo(map);
      layer.on('load', function () {
        setTimeout(function () {
          html2canvas(imageContainer, {
            useCORS: true,
            onclone: function (clonedDoc) {
              clonedDoc.getElementById(imageContainer.id).style.visibility = 'visible';
            }
          }).then(function (canvas) {
            document.body.removeChild(imageContainer);
            me.confirmed.emit({
              image: canvas.toDataURL('image/jpeg'),
              source: me.destination,
              selectedBranch: me.selectedBranch,
              distance : me.distance ,
              deliveryCost : me.deliveryCost ,
              deliveryCompany : me.deliveryCompany ,
              deliveryCompanyDesc : me.deliveryCompanyDesc
            });
            me.close();
            me._overlay.hide();
            resolve();
          });
        }, 500);
      });
    });
  }

  setGeoLocation() {

    if (navigator.geolocation) {
      const me = this;
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        me.setPosition({
          latlng: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      });
    } else {
      this.showInfoMessageBox('پیام سیستم', 'موقعیت یاب بر روی مرورگر شما قابل دسترس نیست.');
    }
  }

}
