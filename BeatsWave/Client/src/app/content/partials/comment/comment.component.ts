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

    constructor(private fb: FormBuilder,
      private commentService: CommentService,
      private snotifyService: SnotifyService,
      private spinner: NgxSpinnerService) { }

    ngOnInit() {
      this.fetchData();

      this.commentForm = this.fb.group({
        'beatId': [''],
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
      this.commentService.comment(this.commentForm.value).subscribe(res => {
        //we have to push the new comment into the array
        this.snotifyService.info('Successfully comented');
        this.spinner.hide('comment');
      })
    }
}
