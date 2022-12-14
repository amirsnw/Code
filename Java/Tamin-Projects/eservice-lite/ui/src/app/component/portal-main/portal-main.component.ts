import { Component, OnInit, ViewChild } from '@angular/core';
import { TaminMenuModel } from 'tamin-framework/lib/models/tamin-menu.model';
import { Router } from '@angular/router';
import { TaminRestService, TaminSecurityService, TaminModalComponent } from 'tamin-framework';
import { AppHelper } from '../../settings/app-helper';
import { DocumentViewerComponent } from 'src/app/component/common/document-viewer/document-viewer.component';

@Component({
  selector: 'app-portal-main',
  templateUrl: './portal-main.component.html',
  styleUrls: ['./portal-main.component.css']
})
export class PortalMainComponent implements OnInit {

  private menuData: TaminMenuModel;
  public menuFavoritesInsured: any = [];
  public menuFavoritesEmployer: any = [];
  public menuFavoritesPensioner: any = [];

  constructor(
    private taminRestService: TaminRestService,
    private router: Router,
    private taminSecurityService: TaminSecurityService) {
  }

  ngOnInit() {
    this.loadAndCacheMenuData();
    window.scrollTo(0, 0);
  }

  loadAndCacheMenuData() {
    this.taminRestService.getAll('assets/data/menu-data.json').then(data => {
      this.menuData = data.data;
    });
  }

  private generateShortcutMenu(tag: string, level: number) {
    const result = [];
    this.menuData.items[level].items.forEach((levelItem) => {
      levelItem.items.forEach((item) => {
        if (item.tags.includes(tag)) {
          result.push(item);
        }
      });
    });
    return result;
  }

  handleMenu(item) {
    this.router.navigate([item.url]);
  }

  public onAppChildTagClicked(item) {
    this.menuFavoritesInsured = this.generateShortcutMenu(item, 1);
    this.menuFavoritesEmployer = this.generateShortcutMenu(item, 2);
    this.menuFavoritesPensioner = this.generateShortcutMenu(item, 3);
  }

  public onAppChildButtonClicked(buttonName) {
    switch (buttonName) {
      case 'login':
        this.loginClick();
        break;
      case 'register-pursue':
        this.router.navigateByUrl('/' + buttonName);
        break;
      default:
        this.router.navigateByUrl('/' + buttonName);
        break;
    }
  }

  public onAppChildHandleMenu(item) {
    this.router.navigate([item.url]);
  }

  loginClick() {
    if (!this.getIsWeb()) {
      this.router.navigate(['login']);
    } else {
      this.taminSecurityService.redirectToLogin();
    }
  }

  getIsWeb() {
    return AppHelper.isWeb();
  }
}