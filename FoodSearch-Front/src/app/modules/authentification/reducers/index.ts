import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { User } from 'src/app/core/models/user/user';
import { AuthActions } from '../actions/action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User;
  token: string;
}

export const initialAuthState: AuthState = {
  user: undefined,
  token: undefined
};


export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user,
      token: action.token
    };
  }),

  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined,
      token: undefined
    };
  })
);
