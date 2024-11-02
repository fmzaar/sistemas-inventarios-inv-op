import {NgModule} from '@angular/core';
import {AuthService} from './services/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {IndentClassPipe} from './pipes/ident-class.pipe';
import {GoogleMapsModule} from '@angular/google-maps';
import {ElipsisPipe} from './pipes/elipsis.pipe';
import {ProjectsPipe} from './pipes/projects.pipe';
import {TooltipListPipe} from './pipes/tooltip-list.pipe';
import {AbsolutePipe} from './pipes/absolute.pipe';
import {NavigationService} from './services/navigation.service';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';


const SHARED_COMPONENTS = [
  ElipsisPipe,
  IndentClassPipe,
  ProjectsPipe,
  TooltipListPipe,
  AbsolutePipe,
];

const SHARED_MODULES = [
  ReactiveFormsModule,
  FlexLayoutModule,
  RouterModule,
  FormsModule,
  GoogleMapsModule,
];

@NgModule({
  declarations: SHARED_COMPONENTS,
  providers: [
    AuthService,
    NavigationService
  ],
  imports: [
    ...SHARED_MODULES,
    CommonModule,
    NgOptimizedImage,
    SweetAlert2Module,
  ],
  exports: [
    ...SHARED_COMPONENTS,
    ...SHARED_MODULES
  ]
})
export class SharedModule {
}
