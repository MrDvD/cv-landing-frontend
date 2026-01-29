import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Attachment } from "src/app/components/activity-info/activity";
import { ConfigService } from "../config/config";
import { HttpClient } from "@angular/common/http";

export interface AttachmentsRepository<T extends Attachment> {
  get(activityId: number): Observable<T[]>;
}

interface AttachmentDTO {
  Id: number;
  Name: string;
  Link: string;
  Priority: number | null;
  AttachmentId: number;
}

@Injectable()
export class DefaultAttachmentsRepository implements AttachmentsRepository<Attachment> {
  private config = inject(ConfigService);
  private http = inject(HttpClient);

  private get apiBase() {
    return this.config.settings.attachmentsApiBase;
  }

  public get(activityId: number): Observable<Attachment[]> {
    return this.http.get<AttachmentDTO[]>(`${this.apiBase}/${activityId}/`).pipe(
      map((dtos) => dtos.map(dto => this.mapToAttachment(dto)))
    );
  }

  private mapToAttachment(dto: AttachmentDTO): Attachment {
    const attachment: Attachment = {
      id: dto.Id,
      name: dto.Name,
      url: dto.Link,
      attachmentId: dto.AttachmentId,
    };
    if (dto.Priority !== null) {
      attachment.priority = dto.Priority;
    }
    return attachment;
  }
}