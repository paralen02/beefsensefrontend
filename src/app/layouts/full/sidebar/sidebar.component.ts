import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BrandingComponent } from './branding.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from '../../../material.module';
import { NavItem } from './nav-item/nav-item';
import { CommonModule } from '@angular/common';
import { AppNavItemComponent } from './nav-item/nav-item.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [BrandingComponent, TablerIconsModule, MaterialModule, CommonModule, AppNavItemComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  @Input() showToggle = true;
  @Input() navItems: NavItem[] = [];
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  loading: boolean = true;


  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 600);
  }
}
