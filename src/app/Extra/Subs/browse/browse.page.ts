import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
})
export class BrowsePage implements OnInit {

  allpostsRef = this.db.list('Posts', ref=>ref.orderByChild("TimeStamp"));
  posts: Array<any> = [];
  postsLoaded: Array<any> = [];

  catsRef =this.db.list('Extra Data/Post Categories');
  cats: Array<any> = [];

  levelRef =this.db.list('Extra Data/levels');
  levels: Array<any> = [];


  constructor(
    private db : AngularFireDatabase,
    public router : Router,
  ) {
    this.getCats();
    this.getPosts();
    //Levels display addition
   }

  ngOnInit() {
  }


  getPosts(){
    this.allpostsRef.snapshotChanges().subscribe(snap=>{
      let tempArray = [];
      snap.forEach(snp=>{
        let temp : any = snp.payload.val();
        temp.key = snp.key;
        if(temp.Status=="Published"){
          tempArray.push(temp);
        }
      })
      this.posts = tempArray;
      this.postsLoaded = tempArray;
    })

  }
  initializeItems(): void {
    this.posts = this.postsLoaded;
  }
  getItems(searchbar) {
    this.initializeItems();
    let q = searchbar;
    if (!q) {
      return;
    }
    this.posts = this.posts.filter((v) => {
      if(v.Name && q) {
        if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  getCats(){
    this.catsRef.snapshotChanges().subscribe(snap=>{
      this.cats = [];
      snap.forEach(snp=>{
        let temp : any = snp.payload.val();
        temp.key = snp.key;
        this.cats.push(temp);
      })
    })
  }


  getLevels(){
    this.levelRef.snapshotChanges().subscribe(snap=>{
      this.levels = [];
      snap.forEach(snp=>{
        let temp : any = snp.payload.val();
        temp.key = snp.key;
        this.levels.push(temp);
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
