import { useState } from 'react';
import { Form, Select, Spin, Typography, Button, Card, message, Modal, PageHeader } from 'antd';
import QRCode from 'react-qr-code';
import { PandaSvg } from '../assets/PandaSvg';
import { useEthContext } from '../utils/eth';
// import { useBtcContext } from '../utils/btc';
import { Icon, InlineIcon } from '@iconify/react';
import ethIcon from '@iconify/icons-cryptocurrency/eth';
import btcIcon from '@iconify/icons-cryptocurrency/btc';
import { useRouter } from 'next/router';

const { Text, Paragraph, Title } = Typography;
const FormItem = Form.Item;
const Option = Select.Option;

export default function Wallet() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [account, setAccount] = useState({});
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const web3 = useEthContext();
  // const createBitcoinAccount = useBtcContext();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const createAccount = async () => {
    setLoading(true);
    let acc = web3.eth.accounts.create(web3.utils.randomHex(32));
    let newAcc = await acc;
    let balance = await web3.eth.getBalance(newAcc.address);
    setBalance(balance);
    setAccount(newAcc);
    setLoading(false);
    showModal();
  };

  //   const createWallet = async () => {
  //     let wallet = web3.eth.accounts.wallet.create(1);
  //     console.log(wallet);
  //     message.success({
  //       content: `Wallet created: ${wallet[0].address} with number of accounts: ${wallet.length}`,
  //       className: 'custom-class',
  //       style: {
  //         marginTop: '20vh',
  //       },
  //     });
  //     let encryptedWallet = wallet.encrypt(web3.utils.randomHex(32));
  //     console.log(encryptedWallet);
  //   };

  return (
    <div>
      <PageHeader className="site-page-header" onBack={() => router.back()} title="Home" subTitle="Go back" />
      <div className="text-center mb-5">
        <PandaSvg />
        <Title level={3}>Generate Wallet</Title>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Form form={form} layout="horizontal" onFinish={createAccount}>
            <FormItem label="Wallet:">
              <Select size="large" defaultValue="eth" style={{ width: 292 }} name="walletSelect">
                <Option value="eth">
                  Ethereum <InlineIcon icon={ethIcon} />
                </Option>
                <Option value="btc" disabled>
                  Bitcoin (coming soon) <InlineIcon icon={btcIcon} />
                </Option>
              </Select>
            </FormItem>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <FormItem>
                <Button loading={loading} size="large" style={{ width: 220 }} type="primary" htmlType="submit">
                  Generate
                </Button>
              </FormItem>
            </div>
          </Form>
        </div>
        <Modal
          title="Wallet Details"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button loading={loading} key="submit" type="primary" loading={loading} onClick={createAccount}>
              Generate
            </Button>,
          ]}
        >
          {loading ? (
            <Spin size="large" />
          ) : (
            <Card
              size="small"
              title={`Test Ethereum Account`}
              extra={<a onClick={handleCancel}>Reset</a>}
              style={{ textOverflow: 'clip' }}
            >
              <Paragraph copyable>
                <span style={{ fontWeight: 'bold' }}>Public Key:</span> {account.address}
              </Paragraph>
              <Paragraph copyable>
                <span style={{ fontWeight: 'bold' }}>Private Key: </span> {account.privateKey}
              </Paragraph>

              <QRCode value={account.address} />
            </Card>
          )}
          <br />
          {balance ? (
            <Text keyboard>
              Balance: {balance} <InlineIcon icon={ethIcon} />
            </Text>
          ) : null}
        </Modal>
      </div>
    </div>
  );
}
