import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import { compose } from 'redux';
// import { getMe } from '../redux/actions/authenticationAction';
import Api from '../config/api';
import { ENDPOINT_API_USER_ME } from '@constant/endpoint';

const routeGuard = (WrappedComponent, screenName = '') => {
  // const individualUserPages = ['userManagement'];
  // const groupUserPages = ['saleAnalysis'];

  class routeGuardHOC extends Component {
    updateUser;

    isMerchantAdmin =
      process.env.APP_MODE === 'merchant' || process.env.APP_ID === 'merchant';

    constructor(props) {
      super(props);
      this.state = { isAuthenticated: false };
    }

    async componentDidMount() {
      const { user } = this.props;
      const { userState } = this.props;
      let isLoggedIn = user || userState;
      if (!isLoggedIn) {
        const fetchUser = await Api.get(ENDPOINT_API_USER_ME);
        isLoggedIn = fetchUser && fetchUser.data && fetchUser.data.data;
      }
      this.checkRole(isLoggedIn);
    }

    checkRole = (user) => {
      if (!user) {
        Router.push('/access-denied');
        return;
      }
      this.setState({ isAuthenticated: true });
    };

    componentDidUpdate(prevProps) {
      if (this.props.user !== prevProps.user) {
        this.checkRole();
      }
    }

    render() {
      const { isAuthenticated } = this.state;
      return isAuthenticated && <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => ({
    userState: state.authenticationReducer.user,
  });
  const mapDispatchToProps = (dispatch) => ({
    // getUser: () => dispatch(getMe()),
  });
  const withConnect = connect(mapStateToProps, mapDispatchToProps);

  return compose(withConnect)(routeGuardHOC);
};

export default routeGuard;
