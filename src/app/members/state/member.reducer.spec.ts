import * as fromMember from './member.reducer';
import * as fromActions from './member.actions';
import { Update } from '@ngrx/entity';
import { Member } from '../models/member.model';

const { initialState } = fromMember;
describe('Member Reducer', () => {
  it('should load members Success', () => {
    const members = [
      {
        firstName: 'John',
        lastName: 'Doe',
        jobTitle: 'Driver',
        team: 'World Rally Championship - Car 90',
        status: true,
        id: 1
      }
    ];

    const entities = {
      1: members[0],
    };

    const action = new fromActions.LoadMembersSuccess(members);
    const state = fromMember.memberReducer(initialState, action);

    expect(state.loading).toEqual(false);
    expect(state.loaded).toEqual(true);
    expect(state.entities).toEqual(entities);
  });

  it('should load members Fail', () => {
    const entities = { };
    const err = 'error';
    const action = new fromActions.LoadMembersFail(err);
    const state = fromMember.memberReducer(initialState, action);

    expect(state.loading).toEqual(false);
    expect(state.loaded).toEqual(false);
    expect(state.error).toEqual(err);
    expect(state.entities).toEqual(entities);
  });

  it('should load member Success', () => {
    const member = {
        firstName: 'John',
        lastName: 'Doe',
        jobTitle: 'Driver',
        team: 'World Rally Championship - Car 90',
        status: true,
        id: 1
      };


    const entities = {
      1: member,
    };

    const action = new fromActions.LoadMemberSuccess(member);
    const state = fromMember.memberReducer(initialState, action);

    expect(state.loading).toEqual(false);
    expect(state.loaded).toEqual(true);
    expect(state.entities).toEqual(entities);
  });

  it('should load member Fail', () => {
    const entities = {
    };

    const err = 'error';
    const action = new fromActions.LoadMemberFail(err);
    const state = fromMember.memberReducer(initialState, action);

    expect(state.loading).toEqual(false);
    expect(state.loaded).toEqual(false);
    expect(state.error).toEqual(err);
    expect(state.entities).toEqual(entities);
  });

  it('should create member Success', () => {
    const member = {
        firstName: 'John',
        lastName: 'Doe',
        jobTitle: 'Driver',
        team: 'World Rally Championship - Car 90',
        status: true,
        id: 1
    };

    const entities = {
      1: member,
    };

    const action = new fromActions.CreateMemberSuccess(member);
    const state = fromMember.memberReducer(initialState, action);
    expect(state.entities).toEqual(entities);
  });

  it('should create member Fail', () => {
    const entities = {
    };

    const err = 'error';
    const action = new fromActions.CreateMemberFail(err);
    const state = fromMember.memberReducer(initialState, action);

    expect(state.loading).toEqual(false);
    expect(state.loaded).toEqual(false);
    expect(state.error).toEqual(err);
    expect(state.entities).toEqual(entities);
  });

  it('should update member Success', () => {
    const member = {
        firstName: 'John',
        lastName: 'Doe',
        jobTitle: 'Driver',
        team: 'World Rally Championship - Car 90',
        status: true,
        id: 1
      };

    const updatedMember: Update<Member> = {
        id: 1,
        changes: member
    };

    const entities = {  };

    const action = new fromActions.UpdateMemberSuccess(updatedMember);
    const state = fromMember.memberReducer(initialState, action);
    expect(state.entities).toEqual(entities);
  });

  it('should update member Fail', () => {
    const entities = {
    };

    const err = 'error';
    const action = new fromActions.UpdateMemberFail(err);
    const state = fromMember.memberReducer(initialState, action);

    expect(state.loading).toEqual(false);
    expect(state.loaded).toEqual(false);
    expect(state.error).toEqual(err);
    expect(state.entities).toEqual(entities);
  });

  it('should delete member Success', () => {
    const entities = {  };
    const action = new fromActions.DeleteMemberSuccess(1);
    const state = fromMember.memberReducer(initialState, action);
    expect(state.entities).toEqual(entities);
  });

  it('should delete member Fail', () => {

    const entities = {
    };

    const err = 'error';
    const action = new fromActions.DeleteMemberFail(err);
    const state = fromMember.memberReducer(initialState, action);

    expect(state.loading).toEqual(false);
    expect(state.loaded).toEqual(false);
    expect(state.error).toEqual(err);
    expect(state.entities).toEqual(entities);
  });
});
