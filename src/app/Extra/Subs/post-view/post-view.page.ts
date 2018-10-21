import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.page.html',
  styleUrls: ['./post-view.page.scss'],
})
export class PostViewPage implements OnInit {
  postId : string;

  pName : string = '';
  time: string;
  authName: string;


  postView : Array<any> = [];


  constructor(
    private route: ActivatedRoute,
    public db :AngularFireDatabase,
    private sanitizer: DomSanitizer,
  ) { 
    this.postId = this.route.snapshot.paramMap.get('id');
    this.getAttributes();
    this.getPost();
  }

  ngOnInit() {
  }

  getAttributes(){
    firebase.database().ref("Posts").child(this.postId).once("value",snap=>{
      this.pName = snap.val().Title;
      this.time= snap.val().TimeStamp;
      this.authName = snap.val().Author;
    });
  }

  getPost(){
    firebase.database().ref("Content").child(this.postId).once("value",itemSnap=>{
      itemSnap.forEach(item=>{
        var temp = item.val();
        temp.key = item.key;
        temp.Data = this.sanitizer.bypassSecurityTrustHtml(temp.Data);
        this.postView.push(temp);
      })
    })
  }


}
