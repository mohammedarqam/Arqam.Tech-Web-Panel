import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-level',
  templateUrl: './level.page.html',
  styleUrls: ['./level.page.scss'],
})
export class LevelPage implements OnInit {

  level : string;

  constructor(
    private route: ActivatedRoute,
    public db :AngularFireDatabase,
  ) {
    this.level = this.route.snapshot.paramMap.get('level');
    console.log(this.level);
   }

  ngOnInit() {
  }

}
