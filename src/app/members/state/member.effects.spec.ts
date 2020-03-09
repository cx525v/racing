import { MemberEffect} from './member.effect';
import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store} from '@ngrx/store';
import { Observable, of} from 'rxjs';
import { AppService } from '../../app.service';
import * as memberActions from './member.actions';
import { Member} from '../models/member.model';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { Update } from '@ngrx/entity';
import * as fromMember from '../state/member.reducer';
import { cold, hot } from 'jasmine-marbles';

const membersData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    jobTitle: 'Driver',
    team: 'World Rally Championship - Car 90',
    status: true,
    id: 1
  }
];
@Injectable()
class MemberServiceMock extends AppService {
  getMembers() {
    return of(membersData);
  }
  getMemberById() {
    return of(membersData[0]);
  }
  addMember(member: Member) {
    return of(membersData[0]);
  }
  updateMember(member: Member) {
    return of(membersData[0]);
  }
  deleteMember(id: number): Observable<Member> {
    return of(membersData[0]);
  }
}
describe('MemberEffects', () => {
  let effects: MemberEffect;
  let actions: Observable<any>;
  let mockStore: Store<fromMember.AppState>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [
        MemberEffect,
        provideMockStore({ initialState: fromMember.initialState }),
        provideMockActions(() => actions),
        {
          provide: AppService,
          useClass: MemberServiceMock
        }
      ]
    });

    effects = TestBed.inject(MemberEffect);
    mockStore = TestBed.inject(Store);
  });

  it('should be created', async () => {
    expect(effects).toBeTruthy();
  });

  it('should loadmembers effects', fakeAsync(() => {

    const members: Member[] = [{
      firstName: 'John',
      lastName: 'Doe',
      jobTitle: 'Driver',
      team: 'World Rally Championship - Car 90',
      status: true,
      id: 1
    }];

    const action = new memberActions.LoadMembers();
    const success = new memberActions.LoadMembersSuccess(members);

    actions = hot('--a-', { a: action });
    const expected = cold('--b', { b: success });
    tick();
    expect(effects.loadMembers$).toBeObservable(expected);
  }));


  it('should loadMember effects', fakeAsync(() => {
    const payload = 1;
    const member: Member = {
      firstName: 'John',
      lastName: 'Doe',
      jobTitle: 'Driver',
      team: 'World Rally Championship - Car 90',
      status: true,
      id: 1
    };
    const action = new memberActions.LoadMember(payload);
    const success = new memberActions.LoadMemberSuccess(member);

    actions = hot('--a-', { a: action });
    const expected = cold('--b', { b: success });
    tick();
    expect(effects.loadMember$).toBeObservable(expected);
  }));

  it('should addMember effects', fakeAsync(() => {
    const payload: Member = {
      firstName: 'John',
      lastName: 'Doe',
      jobTitle: 'Driver',
      team: 'World Rally Championship - Car 90',
      status: true
    };

    const newMember: Member = {
      firstName: 'John',
      lastName: 'Doe',
      jobTitle: 'Driver',
      team: 'World Rally Championship - Car 90',
      status: true,
      id: 1
    };
    const action = new memberActions.CreateMember(payload);
    const success = new memberActions.CreateMemberSuccess(newMember);

    tick();
    actions = hot('--a-', { a: action });
    const expected = cold('--b', { b: success });
    tick();
    expect(effects.createMember$).toBeObservable(expected);
  }));

  xit('should updateMember effects', fakeAsync(() => {
    const payload: Member = {
      firstName: 'John',
      lastName: 'Doe',
      jobTitle: 'Driver',
      team: 'World Rally Championship - Car 90',
      status: true,
      id: 1
    };

    const updatedMember: Update<Member> = {
      id: 1,
      changes: payload
    };
    const action = new memberActions.UpdateMember(payload);
    const success = new memberActions.UpdateMemberSuccess(updatedMember);

    actions = hot('--a-', { a: action });
    const expected = cold('--b', { b: success });

    tick();
    expect(effects.updateMember$).toBeObservable(expected);
  }));

  it('should deleteMember effects', fakeAsync(() => {
    const payload = 1;
    const action = new memberActions.DeleteMember(payload);
    const success = new memberActions.DeleteMemberSuccess(payload);

    actions = hot('--a-', { a: action });
    const expected = cold('--b', { b: success });

    expect(effects.deleteMember$).toBeObservable(expected);
  }));
});
