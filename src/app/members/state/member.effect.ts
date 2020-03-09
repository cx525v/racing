import {Injectable} from '@angular/core';
import { Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import { Observable, of} from 'rxjs';
import { map, mergeMap, catchError} from 'rxjs/operators';
import { AppService } from '../../app.service';
import * as memberActions from './member.actions';
import {Member} from '../models/member.model';

@Injectable({
    providedIn: 'root'
  })
export class MemberEffect {
    constructor(
      private actions$: Actions,
      private memberService: AppService
    ) {}

    @Effect()
    loadMembers$: Observable<Action> = this.actions$.pipe(
        ofType<memberActions.LoadMembers>(
            memberActions.MemberActionTypes.LOAD_MEMBERS
        ),
        mergeMap((actions: memberActions.LoadMembers) =>
           this.memberService.getMembers().pipe(
               map((members: Member[]) => {
                 return new memberActions.LoadMembersSuccess(members);
               }

               ),
               catchError(err => of(new memberActions.LoadMembersFail(err)))
           )
        )
    );

    @Effect()
    loadMember$: Observable<Action> = this.actions$.pipe(
        ofType<memberActions.LoadMember>(
            memberActions.MemberActionTypes.LOAD_MEMBER
        ),
        mergeMap((action: memberActions.LoadMember) =>
           this.memberService.getMemberById(action.payload).pipe(
               map((member: Member) => {
                  return new memberActions.LoadMemberSuccess(member);
               }

               ),
               catchError(err => of(new memberActions.LoadMemberFail(err)))
           )
        )
    );


    @Effect()
    createMember$: Observable<Action> = this.actions$.pipe(
        ofType<memberActions.CreateMember>(
            memberActions.MemberActionTypes.CREATE_MEMBER
        ),
        map((action: memberActions.CreateMember) => action.payload),
        mergeMap((member: Member) =>
           this.memberService.addMember(member).pipe(
               map((newmember: Member) => {
                 return new memberActions.CreateMemberSuccess(newmember);
               }

               ),
               catchError(err => of(new memberActions.CreateMemberFail(err)))
           )
        )
    );


    @Effect()
    updateMember$: Observable<Action> = this.actions$.pipe(
        ofType<memberActions.UpdateMember>(
            memberActions.MemberActionTypes.UPDATE_MEMBER
        ),
        map((action: memberActions.UpdateMember) => action.payload),
        mergeMap((member: Member) =>
           this.memberService.updateMember(member).pipe(
               map((updatemember: Member) => {
                 return new memberActions.UpdateMemberSuccess({
                   id: updatemember.id,
                   changes: updatemember
                 });
               }

               ),
               catchError(err => of(new memberActions.UpdateMemberFail(err)))
           )
        )
    );


    @Effect()
    deleteMember$: Observable<Action> = this.actions$.pipe(
        ofType<memberActions.DeleteMember>(
            memberActions.MemberActionTypes.DELETE_MEMBER
        ),
        map((action: memberActions.DeleteMember) => action.payload),
        mergeMap((id: number) =>
           this.memberService.deleteMember(id).pipe(
               map(() => {
                 return new memberActions.DeleteMemberSuccess(id);
               }

               ),
               catchError(err => of(new memberActions.DeleteMemberFail(err)))
           )
        )
    );
}
