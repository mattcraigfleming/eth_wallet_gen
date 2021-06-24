import { Button } from 'antd';
import Link from 'next/link'
import {WalletOutlined} from '@ant-design/icons'

export default function Home() {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <h1 className="title">
        Home
      </h1>
      <br />
      <div>
      <Link href="/wallet">
        <Button type="primary" icon={<WalletOutlined />} >Wallet </Button>
      </Link>
      </div>
   
    </div>
  );
}
