export interface Tag {
  name: string
  type: TagType
  activityId: number
  priority?: number
}

export type TagType = 'core' | 'additional';