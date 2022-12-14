import {Component, EventEmitter, Output} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from 'src/app/settings/urls';

@Component({
  selector: 'app-portal-main-web',
  templateUrl: './portal-main-web.component.html',
  styleUrls: ['./portal-main-web.component.css']
})
export class PortalMainWebComponent extends TaminPageBaseComponent {
  // @ViewChild('userImage') userImage: ElementRef;
  @Output() buttonClicked = new EventEmitter<any>();
  @Output() tagClicked = new EventEmitter<any>();
  @Output() handleMenu = new EventEmitter<any>();
  private menuData: any;
  highlights = [];
  selectedHighlight: string;
  userImage: any;

  public onButtonClicked(buttonName) {
    this.buttonClicked.emit(buttonName);
  }

  protected initializePage(): void {
    this.restService.getAll('assets/data/menu-data.json')
      .then(value => {
        this.menuData = value.data;
      })
      .catch(reason => {
      });

    if (this.securityService.getToken() && this.securityService.getCurrentUser()) {
      this.restService.getAll(Urls.USER_PROFILE_IMAGE)
        .then(value1 => {
          if (value1.data) {
            this.userImage = 'data:image/png;base64,' + value1.data;
          } else {
            this.userImage = 'assets/images/icons/user.png';
          }
        })
        .catch(reason => {
          // We don't care if there is no image for the user.
        });
    }
  }

  public onTagClicked(data) {
    this.highlights = [];
    this.selectedHighlight = data;
    const root: Array<any> = this.menuData.items;
    root.forEach((item1) => {
      const level2: Array<any> = item1.items;
      if (level2) {
        level2.forEach((item2) => {
          const level3 = item2.items;
          if (level3) {
            level3.forEach((item3) => {
              if (item3.tags.find(c => c === data)) {
                if (!item3.disable) {
                  this.highlights.push({caption: item3.caption, url: item3.url, urlType: item3['url-type']});
                }
              }
            });
          }
        });
      }
    });

  }

  onClickTag(url, urlType) {
    if (url) {
      this.redirectTo(url);
    }
    if (urlType === 'external') {
      window.open(url, '_blank');
    } else {
      this.redirectTo(url);
    }

  }


  public onHandleMenu(item) {
    this.handleMenu.emit(item);
  }
}
