import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/models/user/user';

export const login = createAction(
    '[Authentification Page] User Login',
    props<{user: User, token: string}>()
);

export const logout = createAction(
    '[Top Menu] Logout'
);
