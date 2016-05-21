import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class RecentProjectsService {
  constructor(storageService: StorageService) {
    this.storage = storageService;

    this.recentProjects = storageService.getRecentProjects() || [];
  }

  tryRestoreQuery(project) {
    const recentProject = this.recentProjects.find((p) => this.isSameProject(p, project));
    return recentProject ? recentProject.query : undefined;
  }

  save(project) {
    const index = this.recentProjects.findIndex((p) => this.isSameProject(p, project));

    if (index >= 0) {
      this.recentProjects[index] = project;
    } else {
      this.recentProjects.push(project);
    }

    this.storage.setRecentProjects(this.recentProjects);
  }

  isSameProject(p1, p2) {
    if (p1 && p2) {
      return p1.user === p2.user &&
             p1.repository === p2.repository;
    }
    return false;
  }

}

