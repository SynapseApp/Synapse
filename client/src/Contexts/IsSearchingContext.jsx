import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const IsSearchingContext = createContext();

export const IsSearchingProvider = ({ children }) => {
  const [isSearching, setIsSearching] = useState(false);

  return <IsSearchingContext.Provider value={{ isSearching, setIsSearching }}>{children}</IsSearchingContext.Provider>;
};
IsSearchingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IsSearchingContext;
