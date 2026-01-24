import { InjectionToken } from "@angular/core";
import { ThemeContext } from "./context/theme-context";

export const ServiceToken = {
  THEME_CONTEXT: new InjectionToken<ThemeContext<string>>('ThemeContext'),
};