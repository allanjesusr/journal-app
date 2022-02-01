import Swal from 'sweetalert2'

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { firebaseApp, googleAuthProvider } from '../firebase/firebase-config';
import {types} from '../types/types';
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';
 
export const startLoginEmailPassword = (email, password) =>{
    return (dispatch) => {

        dispatch( startLoading());
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then( ({user}) => {
                dispatch( login( user.uid, user.displayName));
                dispatch( finishLoading() );
            })
            .catch( e => {
                console.log(e);
                dispatch( finishLoading() );
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'User Not Found. The user and password don\'t match each other or might been deleted.'
                  })
            });
    }
};

export const startRegisterwithEmailPasswordName = (email, password, name) => {
    return ( dispatch) => { 
        const auth = getAuth(firebaseApp);
        createUserWithEmailAndPassword(auth, email, password)
            .then( async ({ user }) => {
                await updateProfile(user,{displayName: name});
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch( err => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'User already exists'
                  })
            })
        
    }

};
 
export const startGoogleLogin = () =>{
    return (dispatch) =>{
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
            });
    }
};
 
export const login = (uid, displayName) => ({
    type:types.login,
    payload: {
        uid,
        displayName
    }
});

export const startLogout = () => {
    return async( dispatch ) => {
        const auth = getAuth();
        await signOut(auth);

        dispatch( logout() );
        dispatch( noteLogout() );
    }
}

export const logout = () => ({
    type: types.logout
})
