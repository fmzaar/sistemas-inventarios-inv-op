export class RequestStatus<R = any> {
  constructor(public loading: boolean, public success: boolean | null = null, public data?: R, public error?: any) {}

  public get isRequested(): boolean {
    return !(this.loading === false && this.success === null);
  }

  public get isFinished(): boolean {
    return this.success === true || this.success === false;
  }

  public static initial<R = any>(data?: R) {
    return new RequestStatus(false, undefined, data);
  }

  public static loading<R = any>(data?: R) {
    return new RequestStatus(true, undefined, data);
  }

  public static success<R = any>(data: R) {
    return new RequestStatus(false, true, data);
  }

  public static failed(error: any, data?: any) {
    return new RequestStatus(false, false, data, error);
  }
}
