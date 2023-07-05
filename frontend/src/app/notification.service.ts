import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_HOST } from 'src/utils/constants';
import { getAuthHeaders } from 'src/utils/utils';
import { Notification } from 'src/models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient
  ) { }

  getNotifications() {
    return this.http.get<Notification[]>(`${BACKEND_HOST}/notifications`, {
      headers: getAuthHeaders()
    })
  }

  discardNotification(notificationId: string) {
    const params = new HttpParams()
    return this.http.delete(`${BACKEND_HOST}/notification`, {
      headers: getAuthHeaders(),
      params: params.set('notificationId', notificationId)
    })
  }
}
