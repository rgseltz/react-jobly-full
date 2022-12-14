import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import UserContext from './hooks/userContext';
import useLocalStorage from './hooks/useLocalStorage';
import JoblyApi from './api';
import Navigation from './Navigation';
import Homepage from './Homepage';
import Routes from './Routes';
import jwt from 'jsonwebtoken';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage('token');
  // const [didApply, setDidApply] = useState(false);
  const [appIds, setAppIds] = useState([])
  const logout = () => {
    setCurrentUser(null)
    setToken(null);
    console.log('YOU ARE LOGGED OUT SUCKA')
  }

  useEffect(() => {
    const getUser = async () => {
      if (token) {
        let { username } = jwt.decode(token);
        console.log(username);
        JoblyApi.token = token;
        let user = await JoblyApi.getCurrentUser(username);
        console.log(user)
        setCurrentUser(user);
        if (user.applications.length !== 0) {
          setAppIds(user.applications)
        }
        // console.log(user.applications)
      }
    }
    getUser();
  }, [token]
  );
  console.log('current user', currentUser);
  const registerForToken = async (registerFormData) => {
    try {
      let token = await JoblyApi.register(registerFormData)
      setToken(token);
    } catch (err) {
      console.log(err)
    }
  }

  const login = async (loginFormData) => {
    try {
      let token = await JoblyApi.login(loginFormData);
      setToken(token);
      console.log(token);
    } catch (err) {
      console.error('invalid login', err)
    }
  }

  const update = async (profileData) => {
    try {
      let data = await JoblyApi.update(profileData, currentUser.username);
      console.log(data);
    } catch (err) {
      console.error('request error', err);
    }
  }
  console.log(token);
  // function alreadyApplied(id) {
  //   return appIds.find(id);
  // }
  async function applyToJob(id) {
    try {
      let res = await JoblyApi.apply(id, currentUser.username);
      console.log(res);
      setAppIds([...appIds, id]);
      console.log(appIds);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, applyToJob, appIds }}>
        <Navigation logout={logout} />
        <Routes register={registerForToken} login={login} update={update} />
        {!currentUser && <div> <Link to="/login">Login</Link><Link to="/register">Sign Up</Link></div>}
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
