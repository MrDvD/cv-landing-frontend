export interface Attachment {
  id: number;
  name: string;
  url: string;
  priority?: number;
  attachmentId: number;
}

export interface Activity {
  id: number;
  name: string;
  subtitle?: string;
  metaLabel?: string;
  description: string;
  period: {
    start: string;
    end?: string;
  };
  attachments: Attachment[];
  tags?: {
    core: string[];
    additional?: string[];
  };
}