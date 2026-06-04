import { useMemo, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  FloatButton,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
  Watermark,
  message,
} from 'antd';

import {
  PlusOutlined,
  ClearOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const initialProducts = [
  { id: 1, name: '富士蘋果', category: '食物', price: 200 },
  { id: 2, name: '福斯汽車', category: '車', price:1000000 },
  { id: 3, name: '富士山', category: '山', price: 0 },
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [form] = Form.useForm();

  const totalPrice = useMemo(
    () =>
      products.reduce(
        (sum, item) => sum + Number(item.price || 0),
        0
      ),
    [products]
  );

  const handleAdd = (values) => {
    const newProduct = {
      id: Date.now(),
      ...values,
    };

    setProducts([newProduct, ...products]);
    form.resetFields();

    message.success('產品已新增到表格中');
  };

  const handleResetData = () => {
    setProducts(initialProducts);
    message.success('已還原範例資料');
  };

  const columns = [
    {
      title: '商品名稱',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '分類',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <Tag color="blue">{category}</Tag>
      ),
    },
    {
      title: '價格',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (price) =>
        `NT$ ${Number(price).toLocaleString()}`,
    },
  ];

  return (
    <Watermark content="Ant Design Demo">
      <main style={{ padding: 24 }}>
        {/* 上方標題 */}
        <section
          style={{
            marginBottom: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <Title level={2}>
              React Ant Design 簡易範例
            </Title>

            <Paragraph>
              本範例示範 Button、Space、Card、Form、
              Input、Select、Table、Watermark與FloatButton。
            </Paragraph>
          </div>

          <Space wrap>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => form.submit()}
            >
              新增產品
            </Button>

            <Button
              icon={<ClearOutlined />}
              onClick={handleResetData}
            >
              還原範例資料
            </Button>

            <Button
              icon={<ReloadOutlined />}
              onClick={() => window.location.reload()}
            >
              重新載入頁面
            </Button>
          </Space>
        </section>

        {/* 統計資訊 */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} md={8}>
            <Card>
              <Statistic
                title="商品總數"
                value={products.length}
              />
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card>
              <Statistic
                title="總價格"
                value={totalPrice}
                prefix="NT$"
              />
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Alert
              message="系統正常運行中"
              type="success"
              showIcon
            />
          </Col>
        </Row>

        {/* 表單與表格 */}
        <Row gutter={[24, 24]}>
          {/* 左側表單 */}
          <Col xs={24} lg={8}>
            <Card title="新增商品">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleAdd}
              >
                <Form.Item
                  label="商品名稱"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: '請輸入商品名稱',
                    },
                  ]}
                >
                  <Input placeholder="請輸入商品名稱" />
                </Form.Item>

                <Form.Item
                  label="商品分類"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: '請選擇分類',
                    },
                  ]}
                >
                  <Select
                    placeholder="請選擇分類"
                    options={[
                      {
                        label: '食物',
                        value: '食物',
                      },
                      {
                        label: '車',
                        value: '車',
                      },
                      {
                        label: '山',
                        value: '山',
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label="價格"
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: '請輸入價格',
                    },
                  ]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    placeholder="請輸入價格"
                  />
                </Form.Item>

                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<PlusOutlined />}
                  >
                    新增
                  </Button>

                  <Button
                    onClick={() => form.resetFields()}
                  >
                    清除
                  </Button>
                </Space>
              </Form>
            </Card>
          </Col>

          {/* 右側表格 */}
          <Col xs={24} lg={16}>
            <Card title="商品列表">
              <Table
                rowKey="id"
                columns={columns}
                dataSource={products}
                pagination={{
                  pageSize: 5,
                }}
              />
            </Card>
          </Col>
        </Row>

        {/* 浮動按鈕 */}
        <FloatButton.BackTop />
      </main>
    </Watermark>
  );
}

export default App;