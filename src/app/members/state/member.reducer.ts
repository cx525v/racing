import * as memberActions from './member.actions';
import * as fromRoot from '../../state/app.state';
import { Member} from '../models/member.model';
import { createFeatureSelector, createSelector, State} from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';


export interface MemberState extends EntityState<Member> {
  selectedMemberId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  members: MemberState;
}

export const memberAdapter: EntityAdapter<Member> = createEntityAdapter<Member>();
export const defaultMember: MemberState = {
  ids: [],
  entities: {},
  selectedMemberId: null,
  loaded: false,
  loading: false,
  error: ''
};

export const initialState = memberAdapter.getInitialState(defaultMember);

export function memberReducer(
  state = initialState,
  action: memberActions.action): MemberState {
   switch (action.type) {

     case memberActions.MemberActionTypes.LOAD_MEMBERS_SUCCESS: {

      return memberAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case memberActions.MemberActionTypes.LOAD_MEMBERS_FAIL: {

      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    case memberActions.MemberActionTypes.LOAD_MEMBER_SUCCESS: {
     return memberAdapter.addOne(action.payload, {
       ...state,
       loading: false,
       loaded: true,
       selectedMemberId: action.payload.id,
     });
   }

   case memberActions.MemberActionTypes.LOAD_MEMBER_FAIL: {
     return {
       ...state,
       loading: false,
       loaded: false,
       error: action.payload
     };
   }

   case memberActions.MemberActionTypes.CREATE_MEMBER_SUCCESS: {
    return memberAdapter.addOne(action.payload, state);
  }

  case memberActions.MemberActionTypes.CREATE_MEMBER_FAIL: {
    return {
      ...state,
      loading: false,
      loaded: false,
      error: action.payload
    };
  }

  case memberActions.MemberActionTypes.UPDATE_MEMBER_SUCCESS: {
    return memberAdapter.updateOne(action.payload, state);
  }

  case memberActions.MemberActionTypes.UPDATE_MEMBER_FAIL: {
    return {
      ...state,
      loading: false,
      loaded: false,
      error: action.payload
    };
  }

  case memberActions.MemberActionTypes.DELETE_MEMBER_SUCCESS: {
    return memberAdapter.removeOne(action.payload, state);
  }

  case memberActions.MemberActionTypes.DELETE_MEMBER_FAIL: {
    return {
      ...state,
      loading: false,
      loaded: false,
      error: action.payload
    };
  }

    default: {
      return state;
    }
   }
}

const getMemberFeatureState = createFeatureSelector<MemberState>('members');
export const getMembers = createSelector(
  getMemberFeatureState,
  memberAdapter.getSelectors().selectAll
);

export const getMembersLoading = createSelector(
  getMemberFeatureState,
  (state: MemberState) => state.loading
);

export const getMembersLoaded = createSelector(
  getMemberFeatureState,
  (state: MemberState) => state.loaded
);

export const getError = createSelector(
  getMemberFeatureState,
  (state: MemberState) => state.error
);

export const getCurrentMemberId = createSelector(
  getMemberFeatureState,
  (state: MemberState) => state.selectedMemberId
);

export const getCurrentMember = createSelector(
  getMemberFeatureState,
  getCurrentMemberId,
  state => state.entities[state.selectedMemberId]
);
