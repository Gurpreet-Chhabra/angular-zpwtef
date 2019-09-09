import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';

const ERR_MSG = {
  400: 'Validation Error.',
  403: 'Account Locked',
  404: 'Not found',
  500: 'Server encountered some problem',
  413: 'Request entity too large.',
  503: 'Server Busy',
  504: 'Gateway Timeout',
  502: 'Payment gateway error'
};

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandler implements ErrorHandler {

  constructor(private readonly errorService: ErrorService) { }

  handleError(error: Error | HttpErrorResponse): Error | HttpErrorResponse {
    let message;
    let stackTrace;

    if (error instanceof HttpErrorResponse) {
        // Server Error
      console.log('Server Error');
      const status = error.status;
      message = this.errorService.getServerMessage(error);
      stackTrace = this.errorService.getServerStack(error);
      if (ERR_MSG[status]) {
        // Can use your alert service to display errors.
        // this.alertService.error(message ? message : ERR_MSG[status]);
      } else {
        // this.alertService.error(message);
      }
    } else {
        // Client Error
      console.log('Client error');
      message = this.errorService.getClientMessage(error);
      stackTrace = this.errorService.getClientStack(error);
      // this.alertService.error(error['error'].customMsg);
    }

    return error;
  }
}
