import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { NgxSpinnerService } from 'ngx-spinner';
import { Comment } from 'src/app/core/models/Comment';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {

  @Input() beatId;

  public comments: Comment[];
  public commentForm: FormGroup;
  public replyForm: FormGroup;
  public replyClicked: boolean = false;
  public parentId: number;

  constructor(private fb: FormBuilder,
    private commentService: CommentService,
    private snotifyService: SnotifyService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.fetchData();

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

  private fetchData() {
    this.commentService.getBeat(this.beatId).subscribe(res => {
      this.comments = res;
    })
  }

  public onComment() {
    this.spinner.show('comment');
    this.commentForm.value.beatId = this.beatId;
    this.commentService.commentBeat(this.commentForm.value).subscribe(res => {
      this.comments.push(res)
    }, () => {}, () => {
      this.snotifyService.info('Successfully comented', '', {
        showProgressBar: false
      });
      this.spinner.hide('comment');
      this.commentForm.reset();
    })
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
}
