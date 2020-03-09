import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select} from '@ngrx/store';
import { Observable} from 'rxjs';
import * as memberActions from '../state/member.actions';
import * as fromMember from '../state/member.reducer';
import { Member } from '../models/member.model';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members$: Observable<Member[]>;
  error$: Observable<string>;

  constructor(private store: Store<fromMember.AppState>,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    try {
      this.store.dispatch(new memberActions.LoadMembers());
      this.members$ = this.store.pipe(select(fromMember.getMembers));
      this.error$ = this.store.pipe(select(fromMember.getError));

    } catch (err) {
      console.log(err);
    }
  }

  goToAddMemberForm() {
    this.router.navigate(['add'],  {relativeTo: this.activatedRoute});
  }

  editMemberByID(id: number) {
    this.store.dispatch(new memberActions.LoadMember(id));
    this.router.navigate(['edit'],  {relativeTo: this.activatedRoute});
  }

  deleteMemberById(id: number) {
    if (confirm('Are you sure you want to Delete this member?')) {
      this.store.dispatch(new memberActions.DeleteMember(id));
    }
  }
}
