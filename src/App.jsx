import { useEffect, useMemo, useState } from 'react';

import {
  Button,
  Card,
  Col,
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
  Popconfirm,
} from 'antd';

import {
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function App() {
  const [products, setProducts] = useState([]);
  const [form] = Form.useForm();

  /* 讀取 SQLite 資料 */
  const fetchProducts = async () => {
    const res = await fetch('http://localhost:3001/products');
    const data = await res.json();

    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* 新增 */
  const handleAdd = async (values) => {
    const res = await fetch('http://localhost:3001/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      message.success('新增成功');

      form.resetFields();

      fetchProducts();
    }
  };

  /* 刪除 */
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/products/${id}`, {
      method: 'DELETE',
    });

    message.success('刪除成功');

    fetchProducts();
  };

  const totalPrice = useMemo(
    () =>
      products.reduce(
        (sum, item) => sum + Number(item.price || 0),
        0
      ),
    [products]
  );

  const columns = [
    {
      title: '商品名稱',
      dataIndex: 'name',
    },
    {
      title: '分類',
      dataIndex: 'category',
      render: (category) => (
        <Tag color="blue">{category}</Tag>
      ),
    },
    {
      title: '價格',
      dataIndex: 'price',
      render: (price) =>
        `NT$ ${Number(price).toLocaleString()}`,
    },
    {
      title: '操作',
      render: (_, record) => (
        <Popconfirm
          title="確定刪除？"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button
            danger
            icon={<DeleteOutlined />}
          >
            刪除
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Watermark content="SQLite Demo">
      <main style={{ padding: 24 }}>
        <Title level={2}>
          React + Ant Design + SQLite
        </Title>

        <Paragraph>
          SQLite 商品管理系統
        </Paragraph>

        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card title="新增商品">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleAdd}
              >
                <Form.Item
                  label="商品名稱"
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="分類"
                  name="category"
                  rules={[{ required: true }]}
                >
                  <Select
                    options={[
                      {
                        label: '類別1',
                        value: '類別1',
                      },
                      {
                        label: '類別2',
                        value: '類別2',
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label="價格"
                  name="price"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<PlusOutlined />}
                >
                  新增
                </Button>
              </Form>
            </Card>
          </Col>

          <Col span={16}>
            <Card title="商品列表">
              <Statistic
                title="總價格"
                value={totalPrice}
                prefix="NT$"
                style={{ marginBottom: 20 }}
              />

              <Table
                rowKey="id"
                columns={columns}
                dataSource={products}
              />
            </Card>
          </Col>
        </Row>
      </main>
    </Watermark>
  );
}

export default App;