'use client';

import React from 'react';
import withAuth from '@/hoc/withAuth';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl">This is how to use Middleware in </h1>
    </div>
  );
};

export default withAuth(Dashboard);
