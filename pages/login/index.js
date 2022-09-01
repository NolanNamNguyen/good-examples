import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { testSagaFunction } from '../../redux/slices/commonSlice';

const Login = ({ appLog, handleTestSaga }) => {
  useEffect(() => {
    handleTestSaga({ text: 'check this vendor' });
  }, []);

  useEffect(() => {
    console.log(appLog);
  }, [appLog]);

  return <div>Check this state</div>;
};

const mapStateToProps = (state) => ({
  appLog: state.commonReducer.logs,
});

const mapDispatchToProps = (dispatch) => ({
  handleTestSaga: (params) => dispatch(testSagaFunction(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Login);
