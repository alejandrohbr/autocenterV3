import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project, AVAILABLE_PROJECTS } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private currentProjectSubject: BehaviorSubject<Project>;
  public currentProject$: Observable<Project>;

  constructor() {
    const storedProject = localStorage.getItem('currentProject');
    const initialProject = storedProject
      ? JSON.parse(storedProject)
      : AVAILABLE_PROJECTS[0];

    this.currentProjectSubject = new BehaviorSubject<Project>(initialProject);
    this.currentProject$ = this.currentProjectSubject.asObservable();
  }

  getCurrentProject(): Project {
    return this.currentProjectSubject.value;
  }

  setCurrentProject(project: Project): void {
    localStorage.setItem('currentProject', JSON.stringify(project));
    this.currentProjectSubject.next(project);
  }

  getAvailableProjects(): Project[] {
    return AVAILABLE_PROJECTS.filter(p => p.enabled);
  }

  getProjectById(id: string): Project | undefined {
    return AVAILABLE_PROJECTS.find(p => p.id === id);
  }

  getProjectBySlug(slug: string): Project | undefined {
    return AVAILABLE_PROJECTS.find(p => p.slug === slug);
  }
}
