import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-categories-view',
  templateUrl: './categories-view.page.html',
  styleUrls: ['./categories-view.page.scss'],
})
export class CategoriesViewPage implements OnInit {

  cat : string;
  posts: Array<any> = [];
  postsLoaded: Array<any> = [];


  constructor(
    private route: ActivatedRoute,
    public db :AngularFireDatabase,
    public router : Router,
  ) {
    this.cat = this.route.snapshot.paramMap.get('cat');
    this.getPosts();
   }

  ngOnInit() {
  }
  getPosts(){
    firebase.database().ref("Categories").child(this.cat).once("value",itemSnap=>{
      let tempArray = [];
      itemSnap.forEach(snp=>{
        let temp : any = snp.key;
        this.db.object(`Posts/${temp}`).snapshotChanges().subscribe(snap=>{

          let tempi : any = snap.payload.val();
          tempi.key = snp.key;
          if(tempi.Status=="Published"){
            tempArray.push(tempi);
          }
  
        })
        this.posts = tempArray;
        this.postsLoaded = tempArray;
      })
  })
  }


  gtPost(key){
    this.router.navigate([`/post/${key}`])
  }
  gtCat(c){
    this.router.navigate([`/category/${c}`])
  }
  gtLevel(l){
    this.router.navigate([`/level/${l}`])
  }

}
