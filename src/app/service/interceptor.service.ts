import {
  Injectable,
  Injector,
  Inject,
  NgZone,
  Optional
} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { tap, takeUntil, finalize, catchError } from 'rxjs/operators';
import { CustomErrorHandler } from './custom-error-handler.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  private readonly unsubscribe: Subject<any> = new Subject();
  private readonly disallowedURLs: Array<string> = ['Login'];
  public readonly nonJsonEndpoints: Array<string> = ['Login'];

  constructor(
    private readonly injector: Injector,
    private readonly router: Router,
    private readonly ngZone: NgZone,
    private readonly customErrorHandler: CustomErrorHandler
  ) {
  }
  private readonly jwtHelperService = new JwtHelperService();

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let _request = request;
    const token = localstorage.getItem('token');
    if (_request.url.includes('/api')) {
      if (token !== undefined && token !== '') {
        const reqHeaders = { Authorization: `Bearer ${token}` };
        if (this.nonJsonEndpoints.every(val => !_request.url.includes(val))) {
          reqHeaders['Content-Type'] = 'application/json';
        }
        _request = _request.clone({
          setHeaders: reqHeaders
        });

      } else {
        if (!_request.url.includes('auth')) {
          if (this.disallowedURLs.every(val => !_request.url.includes(val))) {
            // redirect to default route if request made for invalid route or for unauthorized route called
            this.router.navigate(['/home'])
          }
        }
      }
    }

    return next.handle(_request)
      .pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              if (this.disallowedURLs.every(val => !request.url.includes(val))) { 
                try {
                  const expirationLeft = this.jwtHelperService.getTokenExpirationDate(token)
                    .getTime() - Date.now();
                  const timeLeft = new Date(expirationLeft);
                } catch (e) {
                  console.error(e);
                }
                finally {
                  console.groupEnd();
                }
              }
            }
          },
          (error: any) => {
            if (error instanceof HttpErrorResponse) {
              if (error.status === 401) {
                const router = this.injector.get<Router>(Router);
                const errMessage = error && error.error && error.error.customMsg;
                localStorage.clear();
                this.ngZone.run(() => {
                  void router.navigate(['login'], {
                    queryParams: {
                      alertMessage: errMessage ? errMessage : 'Your session has timed out or been invalidated.  Please login again.'
                    }
                  });
                });
              } else if (error.status === 503) {
                const router = this.injector.get<Router>(Router);
                localStorage.clear();
                this.ngZone.run(() => {
                  void router.navigate(['login'], {
                  });
                });
              } else {
                throwError(this.customErrorHandler.handleError(error));
              }
            }
          }
      )
    );
  }
}
