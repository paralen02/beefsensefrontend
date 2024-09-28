import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../material.module';
import { LoginService } from '../../../services/login.service';
import { OperariosService } from '../../../services/operarios.service';
import { RoleService } from '../../../services/role.service'; // Import RoleService

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    MaterialModule,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  role: string = '';
  username: string = '';
  loggedUser: string = '';

  constructor(
    private loginService: LoginService,
    public router: Router,
    private operariosService: OperariosService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationEnd &&
        event.url === '/' &&
        sessionStorage.getItem('shouldRefresh') === 'true'
      ) {
        sessionStorage.removeItem('shouldRefresh');
        location.reload();
      }
    });
    this.checkUserRole();
  }

  logout(): void {
    this.router.navigate(['']);
    sessionStorage.clear();
  }

  checkUserRole(): void {
    const username = this.loginService.getUsername();
    if (username) {
      this.roleService.getRolesForUser(username).subscribe((roles) => {
        const isOperario = roles.some(role => role.rol === 'OPERARIO');
        if (isOperario) {
          this.getOperario();
        } else {
          this.loggedUser = username;
        }
      });
    }
  }

  getOperario(): void {
    const username = this.loginService.getUsername();
    if (username) {
      this.operariosService.findByUsername(username).subscribe((data) => {
        if (data) {
          this.loggedUser = data.nombre;
        }
      });
    }
  }
}
