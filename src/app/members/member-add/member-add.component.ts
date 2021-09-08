import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { Member} from '../models/member.model';
import { Store } from '@ngrx/store';
import * as memberActions from '../state/member.actions';
import * as fromMember from '../state/member.reducer';
@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.css']
})
export class MemberAddComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: string;
  alertMessage: string;
  teams = [];

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private store: Store<fromMember.AppState>
    ) {}

  ngOnInit() {
    this.appService.getTeams().subscribe(data => this.teams = data);
    this.memberForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      team: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnChanges() {}

  get f() { return this.memberForm.controls; }

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
      status: form.get('status').value === 'Active'
    };

    this.store.dispatch(new memberActions.CreateMember(this.memberModel));
    this.memberForm.reset();
    this.router.navigate(['/members']);
  }

  cancel() {
    this.router.navigate(['/members']);
  }
}
