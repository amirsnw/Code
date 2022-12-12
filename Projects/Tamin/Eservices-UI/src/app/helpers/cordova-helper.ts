declare let SafariViewController: any;
declare let downloader: any;
declare let resolveLocalFileSystemURL: any;
declare let requestFileSystem: any;
declare let LocalFileSystem: any;
declare let cordova: any;

// @dynamic
export class CordovaHelper {
  public static openUrl(url, readerMode) {
    SafariViewController.isAvailable(function (available) {
      if (available) {
        SafariViewController.show({
            url: url,
            hidden: false, // default false. You can use this to load cookies etc in the background (see issue #1 for details).
            animated: false, // default true, note that 'hide' will reuse this preference (the 'Done' button will always animate though)
            transition: 'curl', // (this only works in iOS 9.1/9.2 and lower) unless animated is false you can choose from: curl, flip, fade, slide (default)
            enterReaderModeIfAvailable: readerMode, // default false
            tintColor: '#00ffff', // default is ios blue
            barColor: '#0000ff', // on iOS 10+ you can change the background color as well
            controlTintColor: '#ffffff' // on iOS 10+ you can override the default tintColor
          },
          // this success handler will be invoked for the lifecycle events 'opened', 'loaded' and 'closed'
          function (result) {
            // if (result.event === 'opened') {
            //   console.log('opened');
            // } else if (result.event === 'loaded') {
            //   console.log('loaded');
            // } else if (result.event === 'closed') {
            //   console.log('closed');
            // }
          },
          function (msg) {
            // console.log('KO: ' + msg);
          });
      } else {
        // potentially powered by InAppBrowser because that (currently) clobbers window.open
        window.open(url, '_blank', 'location=yes');
      }
    });
  }

  public static download(url: string) {
    downloader.init({folder: 'Downloads', unzip: false, wifiOnly: false});
    downloader.get(url);
  }

  public static savePdf(filename, content): Promise<any> {
    debugger;
    return new Promise<any>((resolve, reject) => {
      CordovaHelper.createDownloadDirectory().then(value => {
        const contentType = 'application/pdf';
        const folderpath = cordova.file.externalRootDirectory + 'Downloads/';
        CordovaHelper.saveBase64AsPDF(folderpath, filename, content, contentType)
          .then(value1 => {
            resolve(value1);
          })
          .catch(reason => {
            console.log(reason);
            reject(reason);
          });
      }).catch(reason => {
        console.log(reason);
        reject(reason);
      });
    });
  }

  public static openPdf(filename) {
    return new Promise<any>((resolve, reject) => {
      cordova.plugins.fileOpener2.showOpenWithDialog(
        cordova.file.externalRootDirectory + 'Downloads/' + filename,
        'application/pdf',
        {
          error: function (e) {
            console.log(e);
            reject();
          },
          success: function () {
            resolve();
          }
        }
      );
    });
  }

  private static createDownloadDirectory(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
        fileSystem.root.getFile(cordova.file.externalRootDirectory + 'Downloads/', {create: false}, () => {
            // folder exists
            resolve();
          },
          () => {
            CordovaHelper.internalCreateDownloadDirectory().then(value => {
              resolve();
            }).catch(reason => {
              reject(reason);
            });
          });
      }, function (err) {
        reject(err);
      });
    });
  }

  private static internalCreateDownloadDirectory() {
    return new Promise<any>((resolve, reject) => {

      const new_directory = 'Downloads/';
      requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
        fileSystem.root.getDirectory(new_directory, {create: true}, function (file) {
          resolve();
        });
      }, function (error) {
        reject(error);
      });


    });
  }

  private static saveBase64AsPDF(folderpath, filename, content, contentType): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const DataBlob = content;
      resolveLocalFileSystemURL(folderpath, function (dir) {
        dir.getFile(filename, {create: true}, function (file) {
          file.createWriter(function (fileWriter) {
            fileWriter.write(DataBlob);
            resolve(folderpath + filename);
          }, function (err) {
            console.log(err);
            reject(err);
          });
        });
      }, function (err) {
        console.log(err);
        reject(err);
      });
    });
  }

  private static base64ToBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: contentType});
  }
}
