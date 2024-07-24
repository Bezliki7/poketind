import React from 'react';

interface Button extends React.ComponentPropsWithRef<'button'> {
  children?: React.ReactNode;
}

export const Button = ({ children, ...props }: Button) => (
  <button
    type='button'
    className='focus:ring-gray-700" w-full rounded-lg border border-gray-950  bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:border-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-200 disabled:bg-gray-700'
    {...props}>
    {children}
  </button>
);
