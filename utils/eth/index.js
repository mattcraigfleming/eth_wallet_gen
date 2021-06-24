import { createContext, useContext } from 'react';
import Web3API from 'web3'

const EthContext = createContext();

export function EthWrapper({ children }) {
    const web3 = new Web3API(
        new Web3API.providers.HttpProvider('https://rinkeby.infura.io/v3/1719ec25b41248c4baabfe20bc98ae44'),
      );
  return (
    <EthContext.Provider value={web3}>
      {children}
    </EthContext.Provider>
  );
}

export function useEthContext() {
  return useContext(EthContext);
}
