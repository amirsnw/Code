import {Component, Injector, isDevMode, ViewChild} from '@angular/core';
import {AppHelper} from '../../settings/app-helper';
import {GovMainComponent} from 'src/app/modules/government/components/gov-main/gov-main.component';
import {PortalLoginComponent} from 'src/app/component/portal-login/portal-login.component';
import {SupportivePackageRegistrationComponent} from 'src/app/modules/government/components/supportive-package/supportive-package-registration/supportive-package-registration.component';
import {SupportivePackageRegistrationFollowUpComponent} from 'src/app/modules/government/components/supportive-package/supportive-package-registration-follow-up/supportive-package-registration-follow-up.component';
import {TaminPageBaseComponent} from 'tamin-framework';
import {PortalMainComponent} from 'src/app/component/portal-main/portal-main.component';
import {SiteFeedbackComponent} from '../common/site-feedback/site-feedback.component';
import {ActivatedRoute} from '@angular/router';
import {PortalUserProfileComponent} from '../portal-user/portal-user-profile/portal-user-profile.component';
import {Urls} from '../../settings/urls';

declare let BrowserDetect: any;
declare let html2canvas: any;
declare var alertify: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent extends TaminPageBaseComponent {
  public isWeb: boolean;
  public isLoginPage: boolean;
  public showHeader: boolean;
  public showFooter: boolean;
  public showMenu: boolean;
  private overlay: any;
  private userImage: any;
  @ViewChild('siteFeedBack') siteFeedBack: SiteFeedbackComponent;
  @ViewChild('userProfile') userProfile: PortalUserProfileComponent;
  public isUserAuthenticated = false;


  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    this.isLoginPage = false;
    this.showHeader = true;
    this.showFooter = this.showMenu = false;

    if (!isDevMode() && !AppHelper.isWeb()) {
      document.addEventListener('deviceready', () => {
        document.addEventListener('backbutton', this.BackButtonHandler, false);
      }, false);
      this.securityService.removeToken();
      this.redirectTo('/login');
    }

    this.isWeb = AppHelper.isWeb();
    this.securityService.loginCallbackCheck();
    const redirectUrl = this.securityService.getRedirectUrl();
    if (redirectUrl && this.securityService.checkToken()) {
      this.securityService.removeRedirectUrl();
      this.redirectTo(redirectUrl);
    }

    if (this.securityService.checkToken()) {
      this.showUnreadMessages();
      this.restService.getAll(Urls.InsuranceRequest);
      this.initializeCurrentUser();
      this.securityService.getCurrentUser()
        .then(value => {
          this.isUserAuthenticated = true;
          this.restService.getAll(Urls.USER_PROFILE_IMAGE)
            .then(value1 => {
              if (value1.data) {
                this.userImage = 'data:image/png;base64,' + value1.data;
              }
            })
            .catch(reason => {
              // We don't care if there is no image for the user.
            });
        })
        .catch(reason => {
          // We don't care if there is an error.
        });
    }
  }

  async initializeCurrentUser() {
    await this.securityService.getCurrentUser();
  }

  showLogin() {
    return this.isWeb;
  }

  onActivateEvents(event) {
    this.showHeader = true;
    this.showFooter = this.showMenu = false;

    if (this.isWeb) {
      this.showMenu = true;
      this.showHeader = true;
      this.showFooter = true;
    }

    if (event instanceof GovMainComponent) {
      this.showHeader = true;
      this.showFooter = false;
      this.showMenu = false;
      return;
    }

    if (event instanceof SupportivePackageRegistrationComponent) {
      this.showHeader = true;
      this.showFooter = false;
      this.showMenu = false;
      return;
    }

    if (event instanceof SupportivePackageRegistrationFollowUpComponent) {
      this.showHeader = true;
      this.showFooter = false;
      this.showMenu = false;
      return;
    }

    if (event instanceof PortalLoginComponent) {
      this.showHeader = false;
      this.showFooter = false;
      this.showMenu = false;
      this.isLoginPage = true;
      return;
    }

    if (event instanceof PortalMainComponent) {
      if (!this.isWeb) {
        this.showHeader = false;
        this.showFooter = false;
        this.showMenu = true;
        this.isLoginPage = false;
      }
      return;
    }
  }

  onRouteActive($event) {
    const root = $event._router.routerState.root;
    if (root.data.showMenu) {
      this.showMenu = root.data.showMenu;
    }
    if (root.data.showFooter) {
      this.showFooter = root.data.showFooter;
    }
    if (root.data.showHeader) {
      this.showHeader = root.data.showHeader;
    }

    const children = $event._router.routerState.root.children.forEach((item) => {
      if (item.data.showMenu) {
        this.showMenu = item.data.showMenu;
      }
      if (item.data.showFooter) {
        this.showFooter = item.data.showFooter;
      }
      if (item.data.showHeader) {
        this.showHeader = item.data.showHeader;
      }
    });
  }

  public BackButtonHandler(e) {
    e.preventDefault();
    if (this.isLoginPage) {
      this.showQuestionBox('خروج از برنامه', 'آیا مطمئن هستید؟', () => {
        (navigator as any).app.exitApp();
      }, () => {
      });
    }
    this.redirectTo('/main');
  }

  public onNavButtonClicked(buttonName) {
    this.redirectTo('/' + buttonName);
  }

  checkBrowser() {
  }

  onFeedbackClick() {
    const me = this;
    this.overlay = this.showOverlay();
    try {
      html2canvas(document.body, {
        ignoreElements: element => element.classList.contains('plainoverlay')
      }).then(canvas => {
        try {
          this.hideOverlay(this.overlay);
          setTimeout(() => {
            me.siteFeedBack.show(canvas.toDataURL('image/jpeg', 0.2));
          }, 0);
        } catch {
        }
      });
    } catch {
      this.hideOverlay(this.overlay);
    }
  }

  showProfile() {
    this.userProfile.show();
    if (this.userImage) {
      this.userProfile.setUserImage(this.userImage);
    }

  }

  showUnreadMessages() {
    this.restService.getAll(Urls.AnnouncementNotSeenMessages)
      .then(value => {
        try {
          if (Number(value.data) !== 0) {
            const message = 'کاربر گرامی شما ' + value.data + ' پیام رویت نشده دارید.';
            alertify.confirm('توجه', message, () => {
                this.redirectTo('app-announcement');
              },
              () => {
              })
              .set({
                labels: {ok: 'رویت پیام ها', cancel: 'انصراف'},
                'closable': false
              });
          }
        } catch {
          // The problem is intentionally ignored, because we don't want to bother user.
        }
      })
      .catch(reason => {
        // The problem is intentionally ignored, because we don't want to bother user.
      });
  }
}
