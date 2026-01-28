import { InjectionToken } from "@angular/core";
import { ThemeContext } from "./context/theme-context";
import { ActivityRepository } from "./activity/repository";
import { SkillsRepository } from "./skills/repository";
import { TreeNode } from "../components/skills-tree/tree-node.model";
import { Activity } from "../components/activity-info/activity";

export const ServiceToken = {
  THEME_CONTEXT: new InjectionToken<ThemeContext<string>>('ThemeContext'),
  ACTIVITY_REPOSITORY: new InjectionToken<ActivityRepository<Activity>>('ActivityRepository'),
  SKILLS_REPOSITORY: new InjectionToken<SkillsRepository<TreeNode>>('SkillsRepository'),
};