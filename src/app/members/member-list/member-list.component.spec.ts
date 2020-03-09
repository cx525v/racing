import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromMember from '../state/member.reducer';
import * as memberActions from '../state/member.actions';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MemberListComponent } from './member-list.component';
import { MembersModule } from '../members.module';
import { Injectable } from '@angular/core';
const {initialState} = fromMember;

const memberData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    jobTitle: 'Driver',
    team: 'World Rally Championship - Car 90',
    status: true,
    id: 1
  },
  {
    firstName: 'chao',
    lastName: 'xu',
    jobTitle: 'Driver',
    team: 'Deutsche Tourenwagen Masters - Car 118',
    status: true,
    id: 2
  },
];

@Injectable()
export class StoreMock {
  pipe = jasmine.createSpy();
  select =  jasmine.createSpy().and.returnValue(of({memberData}));
  dispatch = () => new memberActions.LoadMembers();
}

describe('MemberListComponent', () => {
  let component: MemberListComponent;
  let fixture: ComponentFixture<MemberListComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [ MemberListComponent ],
      providers: [
       { provide: Store, useClass: StoreMock }
     ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate when adding member page', async(() => {
    const navigateSpy = spyOn(router, 'navigate');

    const btn = fixture.debugElement.query(By.css('#addMemberButton'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledWith(['add'],  {relativeTo: activatedRoute});
   }));

  it('should navigate to edit page', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.editMemberByID(1);
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledWith(['edit'],  {relativeTo: activatedRoute});
  });

  it('should popup delete confirm window', () => {

    const popSpy = spyOn(window, 'confirm').and.returnValue(true);
    component.deleteMemberById(1);
    fixture.detectChanges();

    expect(popSpy).toHaveBeenCalled();
  });

});
