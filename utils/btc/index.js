import { createContext, useContext, useState } from 'react';
import { networks, bitcoin } from 'bitcoinjs-lib';
import Bip32 from 'bip32'
import Bip39 from 'bip39'


const BtcContext = createContext();

export function BtcWrapper({ children }) {
    const [account, setAccount] = useState()
    const createBitcoinAccount = () => {
        // Update from testnet to bitcoin
        const network = networks.testnet

        const path = `m/44'/1'/0'/0`
        let mnemonic = Bip39.generateMnemonic()
        const seed = Bip39.mnemonicToSeedSync(mnemonic)
        let rootB = Bip32.fromSeed(seed, network)
        let accountPre = rootB.derivePath(path) 
        let node = accountPre.derive(0).derive(0)

        let btcAddress = bitcoin.payments.p2pkh({
            pubkey: node.publicKey,
            network: network
        }).address

        console.log(`
            Wallet generated: 
            
            - Address: ${btcAddress}
            - Key: ${node.toWIF()}
            - Mnemonic: ${mnemonic}
        `)
    }
  return (
    <BtcContext.Provider value={createBitcoinAccount}>
      {children}
    </BtcContext.Provider>
  );
}

export function useBtcContext() {
  return useContext(BtcContext);
}
