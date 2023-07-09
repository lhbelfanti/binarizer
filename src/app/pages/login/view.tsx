import React from 'react';
import { LoginViewProps } from './types';
import Login from '@components/Login'


/**
 * Login View Component
 */
const View = (props: LoginViewProps) => {
  const { userInfo } = props;

  return (
    <div>
      <Login />
    </div>
  );
};

export default View;
