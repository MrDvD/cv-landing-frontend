export interface Attachment {
  name: string;
  url: string;
}

export interface Activity {
  name: string;
  subtitle: string;
  metaLabel?: string;
  description?: string;
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