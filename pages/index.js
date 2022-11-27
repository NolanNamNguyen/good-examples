/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import MainLayout from '@components/MainLayout';

const Index = () => {
  useEffect(() => {
    console.log('phack lah i have to speed up');
  }, []);

  return (
    <MainLayout title="E-Typing System">
      <h2 className="m-0">E-Typing Project</h2>
    </MainLayout>
  );
};

export default Index;
