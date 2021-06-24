import 'antd/dist/antd.css';
import '../styles/vars.css';
import '../styles/global.css';
import { EthWrapper } from '../utils/eth';
import { BtcWrapper } from '../utils/btc';

export default function MyApp({ Component, pageProps }) {
  return (
    <BtcWrapper>
      <EthWrapper>
        <Component {...pageProps} />
      </EthWrapper>
    </BtcWrapper>
  );
}
