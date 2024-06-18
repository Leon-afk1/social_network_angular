import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  comments = [
    { text: '“Plus bon que bon”', user: new User('prenom','nom','Philosophe68', 'J\'aime manger', 'assets/user1.jpg') },
    { text: '“Quand c\'est bon, qu\'est ce que c\'est bon”', user: new User('prenom','nom','Food lover', 'CAP Cuisine pas le BAC', 'assets/user2.jpg') },
    { text: '“Plus que simplement bo, c\'était bon”', user: new User('prenom','nom','Bg musclé 67', 'Cuisto chez Crous', 'assets/user3.jpg') }
  ];

  categories = ['Asiatique', 'Italien', 'Français', 'Mexicain', 'Végétarien'];

  constructor() { }

  ngOnInit(): void { }
}
