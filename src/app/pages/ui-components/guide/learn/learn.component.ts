import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onVolver() {
    this.router.navigate(['/ui-components/guide']);
  }
}
