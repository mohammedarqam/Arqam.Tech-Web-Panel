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
  postRef =this.db.object(`Posts/${this.postId}`);

  postContentRef =this.db.list(`Content/${this.postId}`);
  postView : Array<any> = [];


  pName : string = '';
  time: string;
  authName: string;

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
    // this.postContentRef.snapshotChanges().subscribe(snap=>{
    //   this.postView = [];
    //   snap.forEach(snp=>{
    //     let temp : any = snp.payload.val();
    //     temp.Priority = snp.key;
    //     console.log(temp);
    //     this.postView.push(temp);
    //   })
    //   // console.log(this.postView)
    // })
    firebase.database().ref("Content").child(this.postId).once("value",snap=>{
      this.postView = [];
      snap.forEach(snp=>{
        let temp = snp.val();
        temp.Data = this.sanitizer.bypassSecurityTrustHtml(temp.Data);
        temp.key = snp.key;
        this.postView.push(temp)
      })
    })
  }

}
