interface Activity {
  name: string;
  subtitle: string;
  metaLabel?: string;
  description?: string;
  tags?: {
    core: string[];
    additional?: string[];
  };
}