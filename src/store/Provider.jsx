import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextEbytr from './ContextEbytr';

export default function Provider({ children }) {
  const [token, setToken] = useState('');

  const contextValue = { token, setToken };
  return (
    <ContextEbytr.Provider value={contextValue}>
      { children }
    </ContextEbytr.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
