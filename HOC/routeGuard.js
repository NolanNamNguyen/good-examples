/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUserProfile, invokeNavigate } from '@reduxSlices/authSlice';

const routeGuard =
  (WrappedComponent, screenName = '') =>
  (wrappedProps) => {
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const authState = useSelector((state) => state.authReducer);

    useEffect(() => {
      if (authState.userProfile) {
        setIsAuthenticated(true);
      }
    }, [authState.userProfile]);

    useEffect(() => {
      if (authState.navigateCode) {
        dispatch(invokeNavigate(false));
      }
    }, [authState.navigateCode]);

    useEffect(() => {
      if (!authState.userProfile) {
        dispatch(getUserProfile({ payload: {} }));
      }
    }, []);

    return isAuthenticated && <WrappedComponent {...wrappedProps} />;
  };

export default routeGuard;
