import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription } from 'rxjs';
import { Beat } from 'src/app/core/models/Beat';
import { Comment } from 'src/app/core/models/Comment';
import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {

  userSubscription: Subscription;
  user: User;
  @Input() beatId;

  public comments: Comment[];
  public commentForm: FormGroup;
  public replyForm: FormGroup;
  public replyClicked: boolean = false;
  public parentId: number;

  constructor(private fb: FormBuilder,
    private commentService: CommentService,
    private snotifyService: SnotifyService,
    private spinner: NgxSpinnerService,
    private authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.user = user;
    })
    this.fetchData().subscribe(res => {
      this.comments = res;
    });

    this.commentForm = this.fb.group({
      'beatId': [''],
      'content': ['', [Validators.required]]
    });

    this.replyForm = this.fb.group({
      'beatId': [''],
      'parentId': [''],
      'content': ['', [Validators.required]]
    })
  }

  private fetchData(): Observable<Comment[]> {
    return this.commentService.getBeat(this.beatId);
  }

  public onComment() {
    if (this.user) {
      this.spinner.show('comment');
      this.commentForm.value.beatId = this.beatId;
      this.commentService.commentBeat(this.commentForm.value).subscribe(res => {
        this.comments.push(res)
      }, () => {
        this.spinner.hide('comment');
      }, () => {
        this.snotifyService.info('Successfully comented', '', {
          showProgressBar: false
        });
        this.spinner.hide('comment');
        this.commentForm.reset();
      })
    }
    else {
      this.snotifyService.warning("You must be logged in", '', {
        showProgressBar: false
      });
    }
  }

  public onOpenReply(parentId: number) {
    if (this.replyClicked == true) {
      this.replyClicked = false;
    }
    else {
      this.replyClicked = true;
    }
    this.parentId = parentId;
  }

  public onReply(comment: Comment) {
    if (this.user) {
      this.replyForm.value.beatId = this.beatId;
      this.replyForm.value.parentId = this.parentId;
      const index = this.comments.indexOf(comment);

      this.commentService.commentBeat(this.replyForm.value).subscribe(res => {
        if  (this.comments[index].children == undefined) {
          this.comments[index].children = Array<Comment>();
        }
        this.comments[index].children.push(res);
       }, () => { }, () => {
        this.snotifyService.info('Successfully replied', '', {
          showProgressBar: false
        });
        this.replyClicked = false;
        this.replyForm.reset();
      })
    }
    else {
      this.snotifyService.warning("You must be logged in", '', {
        showProgressBar: false
      });
    }
  }
}
