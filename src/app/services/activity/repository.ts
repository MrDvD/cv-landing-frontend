import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ConfigService } from '../config/config';

export interface ActivityRepository<T extends Activity> {
  getAll(type: string): Observable<T[]>;
}

interface ActivityDTO {
  Name: string;
  Subtitle: string;
  Description: string | null;
  Type: string;
  MetaLabel: string | null;
  DateStart: string;
  DateEnd: string | null;
}

@Injectable()
export class DefaultActivityRepository implements ActivityRepository<Activity> {
  private config = inject(ConfigService);
  private http = inject(HttpClient);

  private get apiBase() {
    return this.config.settings.activityApiBase;
  }

  public getAll(type: string): Observable<Activity[]> {
    return this.http.get<ActivityDTO[]>(`${this.apiBase}/${type}/`).pipe(
      map(dtos => dtos.map(dto => this.mapToActivity(dto))),
      catchError((error) => {
        console.error('API Error:', error);
        return throwError(() => new Error('Failed to fetch activities'));
      })
    );
  }

  private mapToActivity(dto: ActivityDTO): Activity {
    let activity: Activity = {
      name: dto.Name,
      subtitle: dto.Subtitle,
    }
    if (dto.Description) {
      activity.description = dto.Description;
    }
    if (dto.MetaLabel) {
      activity.metaLabel = dto.MetaLabel;
    }
    return activity;
  }
}