import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ConfigService } from '../config/config';
import { Activity } from 'src/app/components/activity-info/activity';

export interface ActivityRepository<T extends Activity> {
  getAll(type: string): Observable<T[]>;
}

interface ActivityDTO {
  Id: number;
  Name: string;
  Subtitle: string | null;
  Description: string;
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
      map(dtos => {
        const activities = dtos.map(dto => this.mapToActivity(dto));
        return activities;
      }),
      catchError((error) => {
        console.error('API Error:', error);
        return throwError(() => new Error('Failed to fetch activities'));
      })
    );
  }

  private mapToActivity(dto: ActivityDTO): Activity {
    let activity: Activity = {
      id: dto.Id,
      name: dto.Name,
      description: dto.Description,
      attachments: [],
      period: {
        start: dto.DateStart
      }
    }
    if (dto.Subtitle) {
      activity.subtitle = dto.Subtitle;
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