import { useState } from 'react';
import { Form, Select, Spin, Typography, Button, Card, message } from 'antd';
import QRCode from 'react-qr-code';
import Web3API from 'web3';
import { PandaSvg } from '../assets/PandaSvg';

const { Text, Paragraph } = Typography;
const FormItem = Form.Item;
const Option = Select.Option;

const content = {
  marginTop: '100px',
};

export default function Home() {
  const [form] = Form.useForm();
  const [account, setAccount] = useState({});
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(false);
  const web3 = new Web3API(new Web3API.providers.HttpProvider('http://127.0.0.1:8545'));

  const createAccount = async () => {
    setLoading(true);
    let acc = web3.eth.accounts.create(web3.utils.randomHex(32));
    let newAcc = await acc;
    let balance = await web3.eth.getBalance(newAcc.address);
    console.log(balance);
    console.log(newAcc);
    console.log(web3.eth.providers);
    setBalance(balance);
    setAccount(newAcc);
    setLoading(false);
  };

  const createWallet = async () => {
    let wallet = web3.eth.accounts.wallet.create(1);
    console.log(wallet);
    message.success({
      content: `Wallet created: ${wallet[0].address} with number of accounts: ${wallet.length}`,
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
    let encryptedWallet = wallet.encrypt(web3.utils.randomHex(32));
    console.log(encryptedWallet)
  };

  const onReset = () => {
    form.resetFields();
    setAccount({});
    setBalance('');
  };

  return (
    <div style={content}>
      <div className="text-center mb-5">
        <PandaSvg />
        <p className="mb-0 mt-3 text-disabled">Generate Ethereum Wallet!</p>
      </div>
      <div>
        <Form form={form} layout="horizontal" onFinish={createAccount}>
          <FormItem label="Wallet:" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
            <Select size="large" defaultValue="eth" style={{ width: 192 }} name="walletSelect">
              <Option value="eth">Ethereum</Option>
              <Option value="btc" disabled>
                Bitcoin
              </Option>
            </Select>
          </FormItem>
          <FormItem style={{ marginTop: 48 }} wrapperCol={{ span: 8, offset: 8 }}>
            <Button size="large" type="primary" htmlType="submit">
              Generate
            </Button>
            <Button size="large" style={{ marginLeft: 8 }} onClick={onReset}>
              Cancel
            </Button>
            <Button size="large" style={{ marginLeft: 8 }} onClick={createWallet}>
              Account within Wallet
            </Button>
          </FormItem>
        </Form>
        {account.address ? (
            <Card size="small" title="Generated Account" extra={<a href="#">Reset</a>} style={{ width: 'auto' }}>
              {loading ? <Spin /> : null}
              <Paragraph copyable>
                <span style={{ fontWeight: 'bold' }}>Public Key:</span> {account.address}
              </Paragraph>
              <Paragraph copyable>
                <span style={{ fontWeight: 'bold' }}>Private Key: </span> {account.privateKey}
              </Paragraph>
              {balance ? <Text keyboard>Balance: {balance}</Text> : null}
              <QRCode value={account.address} />
            </Card>
        ) : null}
      </div>
    </div>
  );
}
