import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../app.service';
import { Router, RouterModule } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import * as fromMember from '../state/member.reducer';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MemberState } from '../state/member.reducer';
import { By } from '@angular/platform-browser';
import { MemberEditComponent } from './member-edit.component';

const memberState: MemberState = {
  ids: [],
  entities: {},
  selectedMemberId: null,
  loaded: false,
  loading: false,
  error: ''
};

class StoreMock {
  select =  jasmine.createSpy().and.returnValue(of({memberState}));
  dispatch = jasmine.createSpy();
}

describe('MemberEditComponent', () => {
  let component: MemberEditComponent;
  let fixture: ComponentFixture<MemberEditComponent>;
  let router: Router;
  let store: Store<fromMember.AppState>;
  let appService: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        StoreModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ MemberEditComponent ],
      providers: [
        AppService,
        {
          provide: Store,
          useClass: StoreMock,
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberEditComponent);
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService);
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', async(() => {
    component.memberForm.controls.firstName.setValue('');
    expect(component.memberForm.valid).toBeFalsy();

    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('#bSubmit'));
    expect(btn.nativeElement.disabled).toBeTruthy();
   }));

  it('form should be valid', async(() => {
    component.memberForm.controls.firstName.setValue('f');
    component.memberForm.controls.lastName.setValue('l');
    component.memberForm.controls.jobTitle.setValue('j');
    component.memberForm.controls.team.setValue('t');
    component.memberForm.controls.status.setValue(true);
    expect(component.memberForm.valid).toBeTrue();

    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('#bSubmit'));
    expect(btn.nativeElement.disabled).toBeFalsy();
   }));

  it('should navigate when clicking cancel', async(() => {
    const navigateSpy = spyOn(router, 'navigate');

    const btn = fixture.debugElement.query(By.css('#bCancel'));
    btn.nativeElement.click();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/members']);
   }));

  it('store should dispatch when submitting form', async(() => {
    component.memberForm.controls.firstName.setValue('f');
    component.memberForm.controls.lastName.setValue('l');
    component.memberForm.controls.jobTitle.setValue('j');
    component.memberForm.controls.team.setValue('t');
    component.memberForm.controls.status.setValue(true);
    expect(component.memberForm.valid).toBeTrue();

    const navigateSpy = spyOn(router, 'navigate');

    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('#bSubmit'));
    btn.nativeElement.click();

    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/members']);
   }));
});
