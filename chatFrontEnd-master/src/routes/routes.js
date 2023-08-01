import React from 'react';
import { Route, Routes as Wrapper } from 'react-router-dom';
import * as Screen from "../screens"
import Auth from './Auth';

const Routes = () => {
    return (
        <Wrapper>

            <Route path='/login' element={<Screen.Login />} />
            <Route path="/signup" element={<Screen.Signup />} />
            <Route path="/email/verify" element={<Screen.VerifyUser />} />
            <Route path="/" element={<Auth />}>
                <Route path="/" element={<Screen.Chat />} />
            </Route>
        </Wrapper>
    )
}

export default Routes