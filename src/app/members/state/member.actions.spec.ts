import * as memberActions from './member.actions';
import { Member } from '../models/member.model';
import { Update } from '@ngrx/entity';

describe('Member actions', () => {
  it('should create an loadMembers action', () => {
    const action = new memberActions.LoadMembers();
    expect({...action}).toEqual({ type: memberActions.MemberActionTypes.LOAD_MEMBERS});
  });

  it('should create loadMembers_Success action', () => {
    const payload: Member[] = [];
    const action = new memberActions.LoadMembersSuccess(payload);
    expect({...action}).toEqual({ type: memberActions.MemberActionTypes.LOAD_MEMBERS_SUCCESS, payload});
  });

  it('should create loadMembers_Fail action', () => {
    const payload = 'error';
    const action = new memberActions.LoadMembersFail(payload);
    expect({...action}).toEqual({ type: memberActions.MemberActionTypes.LOAD_MEMBERS_FAIL, payload});
  });


  it('should create loadMember action', () => {
    const payload = 1;
    const action = new memberActions.LoadMember(payload);
    expect({...action}).toEqual({ type: memberActions.MemberActionTypes.LOAD_MEMBER, payload});
  });

  it('should create loadMember_Success action', () => {
    const payload: Member =  {
      firstName: 'John',
      lastName: 'Doe',
      jobTitle: 'Driver',
      team: 'World Rally Championship - Car 90',
      status: true,
      id: 1
    };
    const action = new memberActions.LoadMemberSuccess(payload);
    expect({...action}).toEqual({ type: memberActions.MemberActionTypes.LOAD_MEMBER_SUCCESS, payload});
  });

  it('should create loadMember_Fail action', () => {
    const payload = 'error';
    const action = new memberActions.LoadMemberFail(payload);
    expect({...action}).toEqual({ type: memberActions.MemberActionTypes.LOAD_MEMBER_FAIL, payload});
  });

  it('should create CreateMember action', () => {
    const payload: Member =  {
      firstName: 'John',
      lastName: 'Doe',
      jobTitle: 'Driver',
      team: 'World Rally Championship - Car 90',
      status: true,
    };
    const action = new memberActions.CreateMember(payload);
    expect({...action}).toEqual({ type: memberActions.MemberActionTypes.CREATE_MEMBER, payload});
  });

  it('should create createMember_Success action', () => {
    const payload: Member =  {
      firstName: 'John',
      lastName: 'Doe',
      jobTitle: 'Driver',
      team: 'World Rally Championship - Car 90',
      status: true,
     // id: 1
    };
    const action = new memberActions.CreateMemberSuccess(payload);
    expect({...action}).toEqual({ type: memberActions.MemberActionTypes.CREATE_MEMBER_SUCCESS, payload});
  });

  it('should create CreateMember_Fail action', () => {
    const payload = 'error';
    const action = new memberActions.CreateMemberFail(payload);
    expect({...action}).toEqual({ type: memberActions.MemberActionTypes.CREATE_MEMBER_FAIL, payload});
  });

  it('should create UpdateMember action', () => {
    const payload: Member =  {
      firstName: 'John',
      lastName: 'Doe',
      jobTitle: 'Driver',
      team: 'World Rally Championship - Car 90',
      status: true,
      id: 1
    };
    const action = new memberActions.UpdateMember(payload);
    expect({...action}).toEqual({ type: memberActions.MemberActionTypes.UPDATE_MEMBER, payload});
  });

  it('should create UpdateMember_Success action', () => {
    const payload: Update<Member> = {
      id: 1,
      changes: {
        firstName: 'John',
        lastName: 'Doe',
        jobTitle: 'Driver',
        team: 'World Rally Championship - Car 90',
        status: true
      }
    };
    const action = new memberActions.UpdateMemberSuccess(payload);
    expect({...action}).toEqual({ type: memberActions.MemberActionTypes.UPDATE_MEMBER_SUCCESS, payload});
  });


  it('should create UpdateMember_Fail action', () => {
    const payload = 'error';
    const action = new memberActions.UpdateMemberFail(payload);
    expect({...action}).toEqual({ type: memberActions.MemberActionTypes.UPDATE_MEMBER_FAIL, payload});
  });


  it('should create DeleteMember action', () => {
    const payload = 1;
    const action = new memberActions.DeleteMember(payload);
    expect({...action}).toEqual({ type: memberActions.MemberActionTypes.DELETE_MEMBER, payload});
  });

  it('should create DeleteMember_Fail action', () => {
    const payload = 'error';
    const action = new memberActions.DeleteMemberFail(payload);
    expect({...action}).toEqual({ type: memberActions.MemberActionTypes.DELETE_MEMBER_FAIL, payload});
  });

});
