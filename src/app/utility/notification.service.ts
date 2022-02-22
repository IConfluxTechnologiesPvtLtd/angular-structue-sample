import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

export interface NotificationModel {
  showNotification: boolean;
  message: string;
  type: 'danger' | 'success';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationval = new BehaviorSubject<NotificationModel>({ 
    showNotification: false,
    message: '', 
    type: 'success' 
  });
  constructor() { }
  showNotification(message:string,type:any){
    this.notificationval.next({ 
      showNotification: true,
      message: message, 
      type: type 
    });
    setTimeout(()=>{
      this.hideNotification();
    },3000);
  }
  hideNotification(){
    this.notificationval.next({ 
      showNotification: false,
      message: '', 
      type: 'success'
    });
  }
}
