import React from 'react';
import classNames from 'classnames';
import { CircularProgress } from '@mui/material';

const LoadingWrapper = ({
  isLoading,
  children,
  spinnerClass,
  containerClass,
}) => (
  <div className={classNames(containerClass, 'relative overflow-hidden w-fit')}>
    {children}
    {isLoading && (
      <div
        className={classNames(
          'flex loading-small loading-wrapper',
          spinnerClass,
        )}
      >
        <CircularProgress color={'primary'} onProgress={isLoading} />
      </div>
    )}
  </div>
);

export default LoadingWrapper;
