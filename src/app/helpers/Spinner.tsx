import * as React from 'react';
import Loader from 'react-loader-spinner';

export const Spinner = () => (
  <div className="text-center" style={{ padding: 20 }}>
    <Loader type="Oval" color="yellow" height={80} width={80} />
  </div>
);
