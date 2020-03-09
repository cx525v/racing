import { Action} from '@ngrx/store';
import { Member} from '../models/member.model';
import { Update } from '@ngrx/entity';
export enum MemberActionTypes {
  LOAD_MEMBERS = 'Load Members',
  LOAD_MEMBERS_SUCCESS = 'Load Members Success',
  LOAD_MEMBERS_FAIL = 'Load Members Fail',

  LOAD_MEMBER = 'Load Member',
  LOAD_MEMBER_SUCCESS = 'Load Member Success',
  LOAD_MEMBER_FAIL = 'Load Member Fail',

  CREATE_MEMBER = 'Create Member',
  CREATE_MEMBER_SUCCESS = 'Create Member Success',
  CREATE_MEMBER_FAIL = 'Create Member Fail',

  UPDATE_MEMBER = 'Update Member',
  UPDATE_MEMBER_SUCCESS = 'Update Member Success',
  UPDATE_MEMBER_FAIL = 'Update Member Fail',

  DELETE_MEMBER = 'Delete Member',
  DELETE_MEMBER_SUCCESS = 'Delete Member Success',
  DELETE_MEMBER_FAIL = 'Delete Member Fail',
}

export class LoadMembers implements Action {
  readonly type = MemberActionTypes.LOAD_MEMBERS;
}

export class LoadMembersSuccess implements Action {
  readonly type = MemberActionTypes.LOAD_MEMBERS_SUCCESS;
  constructor(public payload: Member[]) {}
}

export class LoadMembersFail implements Action {
  readonly type = MemberActionTypes.LOAD_MEMBERS_FAIL;
  constructor(public payload: string) {}
}

export class LoadMember implements Action {
  readonly type = MemberActionTypes.LOAD_MEMBER;
  constructor(public payload: number) {}
}

export class LoadMemberSuccess implements Action {
  readonly type = MemberActionTypes.LOAD_MEMBER_SUCCESS;
  constructor(public payload: Member) {}
}

export class LoadMemberFail implements Action {
  readonly type = MemberActionTypes.LOAD_MEMBER_FAIL;
  constructor(public payload: string) {}
}

export class CreateMember implements Action {
  readonly type = MemberActionTypes.CREATE_MEMBER;
  constructor(public payload: Member) {
  }
}

export class CreateMemberSuccess implements Action {
  readonly type = MemberActionTypes.CREATE_MEMBER_SUCCESS;
  constructor(public payload: Member) {}
}

export class CreateMemberFail implements Action {
  readonly type = MemberActionTypes.CREATE_MEMBER_FAIL;
  constructor(public payload: string) {
  }
}


export class UpdateMember implements Action {
  readonly type = MemberActionTypes.UPDATE_MEMBER;
  constructor(public payload: Member) {}
}

export class UpdateMemberSuccess implements Action {
  readonly type = MemberActionTypes.UPDATE_MEMBER_SUCCESS;
  constructor(public payload: Update<Member>) {}
}

export class UpdateMemberFail implements Action {
  readonly type = MemberActionTypes.UPDATE_MEMBER_FAIL;
  constructor(public payload: string) {}
}

export class DeleteMember implements Action {
  readonly type = MemberActionTypes.DELETE_MEMBER;
  constructor(public payload: number) {}
}

export class DeleteMemberSuccess implements Action {
  readonly type = MemberActionTypes.DELETE_MEMBER_SUCCESS;
  constructor(public payload: number) {}
}

export class DeleteMemberFail implements Action {
  readonly type = MemberActionTypes.DELETE_MEMBER_FAIL;
  constructor(public payload: string) {}
}
export type action =  LoadMembers |LoadMembersFail| LoadMembersSuccess |
                      LoadMember |LoadMemberFail| LoadMemberSuccess |
                      CreateMember |CreateMemberFail| CreateMemberSuccess |
                      UpdateMember |UpdateMemberFail| UpdateMemberSuccess |
                      DeleteMember |DeleteMemberFail| DeleteMemberSuccess;
