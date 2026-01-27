import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { TreeNode } from 'src/app/components/skills-tree/tree-node.model';
import { ConfigService } from '../config/config';

export interface SkillsRepository<T extends TreeNode> {
  getHard(): Observable<T[]>;
  getSoft(): Observable<T[]>;
}

@Injectable()
export class DefaultSkillsRepository implements SkillsRepository<TreeNode> {
  private config = inject(ConfigService);
  private http = inject(HttpClient);

  private get apiBase() {
    return this.config.settings.skillsApiBase;
  }

  public getHard(): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(`${this.apiBase}/hard/`).pipe(
      map(response => response || []),
      catchError(this.handleError)
    );
  }

  public getSoft(): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(`${this.apiBase}/soft/`).pipe(
      map(response => response || []),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('SkillsRepository Error:', error);
    return throwError(() => new Error('Could not retrieve skills data.'));
  }
}
