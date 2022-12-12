declare var device;

export class AppHelper {
  public static getPlatform(): string {
    return window.hasOwnProperty('cordova') ? device.platform : 'web';
  }

  public static isWeb(): boolean {
    return !window.hasOwnProperty('cordova');
  }

  public static handleErrorMessage(error, message) {
    return error === typeof String ? error : message;
  }
}

