import React from "react";
import {Switch, Route} from 'react-router-dom';
import Homepage from "./Homepage";
import CompaniesList from "./CompaniesList";
import CompanyDetail from "./CompanyDetail";
import LoginForm from "./LoginForm";
import JobsList from "./JobsList";
import SignupForm from "./SignupForm";
import ProfileForm from './ProfileForm';


const Routes = () => {
return (
    <Switch>
        <Route path={'/companies/:handle'}><CompanyDetail/></Route>
        <Route path={'/companies'}><CompaniesList/></Route>
        <Route path={'/jobs'}><JobsList/></Route>
        <Route path={'/profile-form'}><ProfileForm/></Route>
        <Route path={'/login'}><LoginForm/></Route>
        <Route path={'/register'}><SignupForm/></Route>
        <Route path={'/'}><Homepage/></Route>
    </Switch>
)
}

export default Routes;