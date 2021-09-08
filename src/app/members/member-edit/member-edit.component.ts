import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { Member} from '../models/member.model';
import { Store } from '@ngrx/store';
import * as memberActions from '../state/member.actions';
import * as fromMember from '../state/member.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: string;
  alertMessage: string;
  teams = [];
  id: number;
  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private store: Store<fromMember.AppState>
    ) {}

  ngOnInit() {
    this.memberForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      team: ['', Validators.required],
      status: ['', Validators.required],
      id: null
    });
    this.loadData();
    this.appService.getTeams().subscribe(data => this.teams = data);
  }
  get f() { return this.memberForm.controls; }
  loadData() {
      const member$: Observable<Member> = this.store.select(
      fromMember.getCurrentMember
    );
      member$.subscribe(currentMember => {
      if (currentMember) {
        this.id = currentMember.id;
        this.memberForm.patchValue({
           firstName: currentMember.firstName,
           lastName: currentMember.lastName,
           jobTitle: currentMember.jobTitle,
           team: currentMember.team,
           status: !!currentMember.status ? 'Active' : 'Inactive'
        });
      }
    });
  }
  // TODO: Add member to members
  onSubmit(form: FormGroup) {
    this.submitted = true;
    if (this.memberForm.invalid) {
        return;
    }

    this.memberModel = {
      firstName: form.get('firstName').value,
      lastName: form.get('lastName').value,
      jobTitle: form.get('jobTitle').value,
      team: form.get('team').value,
      status: form.get('status').value === 'Active',
      id: this.id
     };
 
    this.store.dispatch(new memberActions.UpdateMember(this.memberModel));
    this.router.navigate(['/members']);
  }

  cancel() {
    this.router.navigate(['/members']);
  }
}
