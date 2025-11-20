import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { AuthService } from '../services/auth.service';
import { Project } from '../models/project.model';
import { FooterComponent } from './footer.component';

@Component({
  selector: 'app-project-selector',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <!-- Header -->
      <div class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Panel de Control</h1>
              <p class="text-sm text-gray-600 mt-1">Bienvenido, {{ auth.getCurrentUser()?.username }}</p>
            </div>
            <div class="flex items-center gap-3">
              <button
                (click)="navigateToUsers()"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                Usuarios
              </button>
              <button
                (click)="navigateToAudit()"
                class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Auditoría Avanzada
              </button>
              <button
                (click)="logout()"
                class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors shadow-sm"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="mb-10">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Selecciona un Proyecto</h2>
            <p class="text-gray-600">Elige el proyecto con el que deseas trabajar</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- AutoCenter -->
            <div
              (click)="selectProject(projects[0])"
              class="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-300 overflow-hidden group"
            >
              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <div class="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                    </svg>
                  </div>
                  <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>

                <h3 class="text-xl font-bold text-gray-900 mb-2">AutoCenter</h3>
                <p class="text-sm text-gray-600 mb-4">Sistema de gestión para talleres mecánicos</p>

                <div class="mb-4">
                  <p class="text-xs font-semibold text-gray-700 mb-2">Funcionalidades:</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">Dashboard</span>
                    <span class="px-3 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">Nuevo Presupuesto</span>
                    <span class="px-3 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">Validación Admin</span>
                    <span class="px-3 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">Validación Pre-OC</span>
                    <span class="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">+2 más</span>
                  </div>
                </div>

                <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span class="text-sm text-blue-600 font-medium">6 funcionalidades</span>
                  <span class="text-sm text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">Acceder →</span>
                </div>
              </div>
            </div>

            <!-- Decoraciones -->
            <div
              (click)="selectProject(projects[1])"
              class="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-pink-300 overflow-hidden group"
            >
              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <div class="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center">
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                    </svg>
                  </div>
                  <svg class="w-5 h-5 text-gray-400 group-hover:text-pink-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>

                <h3 class="text-xl font-bold text-gray-900 mb-2">Decoraciones</h3>
                <p class="text-sm text-gray-600 mb-4">Sistema de gestión para decoraciones</p>

                <div class="mb-4">
                  <p class="text-xs font-semibold text-gray-700 mb-2">Funcionalidades:</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 rounded-md text-xs font-medium bg-pink-50 text-pink-700 border border-pink-200">Dashboard</span>
                    <span class="px-3 py-1 rounded-md text-xs font-medium bg-pink-50 text-pink-700 border border-pink-200">Nuevo Presupuesto</span>
                    <span class="px-3 py-1 rounded-md text-xs font-medium bg-pink-50 text-pink-700 border border-pink-200">Validación Admin</span>
                    <span class="px-3 py-1 rounded-md text-xs font-medium bg-pink-50 text-pink-700 border border-pink-200">Validación Pre-OC</span>
                    <span class="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">+2 más</span>
                  </div>
                </div>

                <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span class="text-sm text-pink-600 font-medium">6 funcionalidades</span>
                  <span class="text-sm text-pink-600 font-semibold group-hover:translate-x-1 transition-transform">Acceder →</span>
                </div>
              </div>
            </div>

            <!-- Hecho a la Medida -->
            <div
              (click)="selectProject(projects[2])"
              class="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-purple-300 overflow-hidden group"
            >
              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <div class="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
                    <svg class="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                    </svg>
                  </div>
                  <svg class="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>

                <h3 class="text-xl font-bold text-gray-900 mb-2">Hecho a la Medida</h3>
                <p class="text-sm text-gray-600 mb-4">Sistema de gestión para proyectos personalizados</p>

                <div class="mb-4">
                  <p class="text-xs font-semibold text-gray-700 mb-2">Funcionalidades:</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">Dashboard</span>
                    <span class="px-3 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">Nuevo Presupuesto</span>
                    <span class="px-3 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">Validación Admin</span>
                    <span class="px-3 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">Validación Pre-OC</span>
                    <span class="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">+2 más</span>
                  </div>
                </div>

                <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span class="text-sm text-purple-600 font-medium">6 funcionalidades</span>
                  <span class="text-sm text-purple-600 font-semibold group-hover:translate-x-1 transition-transform">Acceder →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <app-footer></app-footer>
    </div>
  `
})
export class ProjectSelectorComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projects = this.projectService.getAvailableProjects();
  }

  selectProject(project: Project): void {
    this.projectService.setCurrentProject(project);
    this.router.navigate(['/dashboard']);
  }

  navigateToUsers(): void {
    this.router.navigate(['/users']);
  }

  navigateToAudit(): void {
    this.router.navigate(['/audit']);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
