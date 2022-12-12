export class HttpErrorHandler {
  public static isClientError(error) {
    return error.error instanceof ErrorEvent;
  }

  getErrorMessage(error): string {
    if (error.error instanceof ErrorEvent) {
      return 'به نظر میاید ارتباط شما با اینترنت برقرار نمی باشد.';
    } else {
      return error.message;
    }
  }
}
