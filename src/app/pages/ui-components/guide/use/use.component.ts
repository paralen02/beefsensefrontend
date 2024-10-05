import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../material.module';

@Component({
  selector: 'app-use',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './use.component.html',
  styleUrls: ['./use.component.css']
})
export class UseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
