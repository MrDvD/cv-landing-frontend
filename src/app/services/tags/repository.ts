import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError, map, catchError } from "rxjs";
import { Tag, TagType } from "./tag";
import { ConfigService } from "../config/config";

export interface TagsRepository<T extends Tag = Tag> {
  getAll(type: TagType): Observable<T[]>;
  getByActivityId(activityId: number, type: TagType): Observable<T[]>;
}

export interface TagDto {
  Name: string;
  Type: string;
  ActivityId: number;
  Priority: number | null;
}

@Injectable()
export class DefaultTagsRepository implements TagsRepository<Tag> {
  private config = inject(ConfigService);
  private http = inject(HttpClient);

  private get apiBase() {
    return this.config.settings.tagsApiBase;
  }

  public getAll(type: TagType): Observable<Tag[]> {
    return this.http.get<TagDto[]>(`${this.apiBase}/${type}/`).pipe(
      map(dtos => (dtos ?? []).map(dto => this.mapToTag(dto))),
      catchError(this.handleError)
    );
  }

  public getByActivityId(activityId: number, type: TagType): Observable<Tag[]> {
    return this.http.get<TagDto[]>(`${this.apiBase}/${activityId}/${type}/`).pipe(
      map(dtos => (dtos ?? []).map(dto => this.mapToTag(dto))),
      catchError(this.handleError)
    );
  }

  private mapToTag(dto: TagDto): Tag {
    return {
      name: dto.Name,
      type: dto.Type as TagType,
      activityId: dto.ActivityId,
      priority: dto.Priority ?? 0
    };
  }

  private handleError(error: any) {
    console.error('TagsRepository Error:', error);
    return throwError(() => new Error('Could not retrieve tags data.'));
  }
}