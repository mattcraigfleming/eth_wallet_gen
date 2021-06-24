import { useState } from 'react';
import { Form, Select, Spin, Typography, Button, Card, message, Modal } from 'antd';
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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const web3 = new Web3API(new Web3API.providers.HttpProvider('https://rinkeby.infura.io/v3/1719ec25b41248c4baabfe20bc98ae44'));

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
    showModal()
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
        <p className="mb-0 mt-3 text-disabled">Generate Cryptocurrency Wallet!</p>
      </div>
      <div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Form form={form} layout="horizontal" onFinish={createAccount}>
          <FormItem label="Wallet:">
            <Select size="large" defaultValue="eth" style={{ width: 292 }} name="walletSelect">
              <Option value="eth">Ethereum</Option>
              <Option value="btc" disabled>
                Bitcoin (coming soon)
              </Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button size="large" style={{ marginLeft: 28 }} type="primary" htmlType="submit">
              Generate
            </Button>
            <Button size="large" style={{ marginLeft: 8 }} onClick={onReset}>
              Cancel
            </Button>
       
          </FormItem>
        </Form>
        </div>
        <Modal title="Wallet Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Card size="small" title="Test Ethereum Account" extra={<a onClick={handleCancel}>Reset</a>} style={{  textOverflow: 'clip'}}>
              {loading ? <Spin /> : null}
              <Paragraph copyable>
                <span style={{ fontWeight: 'bold' }}>Public Key:</span> {account.address}
              </Paragraph>
              <Paragraph copyable>
                <span style={{ fontWeight: 'bold' }}>Private Key: </span> {account.privateKey}
              </Paragraph>
            
              <QRCode value={account.address} />
            </Card>
            <br />
            {balance ? <Text keyboard>Balance: {balance}</Text> : null}
      </Modal>
  
      </div>
    </div>
  );
}
