import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { JournalScreen } from "../components/journal/JournalScreen";
import { login } from '../actions/auth';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';


export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn(true);
                dispatch( startLoadingNotes( user.uid ) );

            }  else {
                setIsLoggedIn(false);
            }

            setChecking(false);
        });

    }, []);

    if ( checking ) {
        return (
        <h1>Wait...</h1>
        )
    }
    

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/*" element={
                    <PublicRoute isAuth={isLoggedIn}> 
                        <AuthRouter /> 
                    </PublicRoute>}
                />
                <Route path="/" element={
                    <PrivateRoute isAuth={isLoggedIn}>
                        <JournalScreen /> 
                    </PrivateRoute>}
                    />
                <Route path="*" element={ <AuthRouter /> } />
            </Routes>
        </BrowserRouter>
    )
}
