import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AppService } from './service/app.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule,  } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TabViewModule } from 'primeng/primeng';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './service/interceptor.service';
import { ErrorService } from './service/error.service';
import { CustomErrorHandler } from './service/custom-error-handler.service';
import {TreeModule} from 'primeng/tree';

@NgModule({
  imports:      [ BrowserAnimationsModule, BrowserModule, FormsModule,TreeModule,ReactiveFormsModule, RouterModule.forRoot([]), HttpClientModule, TabViewModule],
  declarations: [ AppComponent, PaginationComponent ],
  bootstrap: [ AppComponent ],
  providers: [AppService, ErrorService, CustomErrorHandler]
})
export class AppModule { }
