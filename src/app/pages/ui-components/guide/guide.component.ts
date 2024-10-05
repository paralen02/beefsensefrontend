import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

// card 2
interface cardimgs {
  id: number;
  time: string;
  imgSrc: string;
  user: string;
  title: string;
  category: string;
  date: string;
}

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [MatCardModule, CommonModule, MaterialModule, MatChipsModule, TablerIconsModule, MatButtonModule, RouterModule],
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent {
  constructor() {}

  // card 2
  cardimgs: cardimgs[] = [
    {
      id: 1,
      time: 'Lectura de 10 min',
      imgSrc: '/assets/images/blog/blog-img1.jpg',
      user: '/assets/images/profile/user-6.jpg',
      title: 'Manual de Aprendizaje',
      category: 'Manual',
      date: 'Octubre 2024',
    },
    // {
    //   id: 2,
    //   time: 'Lectura de 20 min',
    //   imgSrc: '/assets/images/blog/blog-img2.jpg',
    //   user: '/assets/images/profile/user-6.jpg',
    //   title: 'Manual de uso',
    //   category: 'Manual',
    //   date: 'Octubre 2024',
    // }
  ];

  getRouterLink(title: string): string {
    if (title === 'Manual de uso') {
      return '/ui-components/guide/use';
    } else if (title === 'Manual de Aprendizaje') {
      return '/ui-components/guide/learn';
    } else {
      return '/';
    }
  }

  trackByImgSrc(index: number, cardimg: cardimgs): string {
    return cardimg.imgSrc;
  }
}
