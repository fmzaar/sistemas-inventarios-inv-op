import {ApplicationRef, ComponentFactoryResolver, Injectable, Injector} from '@angular/core';
import Swal, {SweetAlertIcon} from 'sweetalert2';
import {HttpClient} from '@angular/common/http';
import {ErrorInterface} from '../interfaces/error.interface';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor(private http: HttpClient, private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) {

  }

  showSimpleAlert(title: string, text: string, icon: SweetAlertIcon, textConfirm: string): Promise<any> {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonColor: '#95C11F',
      confirmButtonText: textConfirm
    });
  }


  showSimpleAlertSucess(title: string, html: string, textConfirm: string): Promise<any> {
    return Swal.fire({
      title: title,
      html: html,
      icon: 'success',
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonColor: '#95C11F',
      confirmButtonText: textConfirm
    });
  }


  showConfirmationAlert(title: string, text: string, icon: SweetAlertIcon, textConfirm: string, textCancel: string): Promise<any> {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: '#95C11F',
      confirmButtonText: textConfirm,
      cancelButtonText: textCancel
    });
  }

  async showSimpleErrorAlert(error: ErrorInterface): Promise<any> {
    if (!error)
      return;
    return await Swal.fire({
      title: error.error,
      text: error.message,
      icon: 'error',
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonColor: '#19ab9f',
      confirmButtonText: 'Aceptar'
    });
  }
  showLoading(message: string): void {
    Swal.fire({
      title: 'Por favor espera',
      text: message,
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false
    });
  }

}
