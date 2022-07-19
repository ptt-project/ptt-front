import { PlusOutlined } from '@ant-design/icons'
import { Typography, Modal, Upload, Col, Form, Input, Row, Select } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import React, { useState } from 'react'
import HighlightLabel from '~/components/main/HighlightLabel'
import t from '~/locales'
import styles from '../SellerMyProductsForm.module.scss'

const { Text, Title } = Typography
const { TextArea } = Input
interface IFormProductInfoProps {
  label?: string
  value?: boolean
  onChange?: (value: boolean) => void
  onHintClick?: () => void
  disabled?: boolean
}
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
const Info: React.FC<IFormProductInfoProps> = (props: IFormProductInfoProps) => {
  const { label, value, onChange, onHintClick, disabled } = props
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-6',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ])

  const handleCancel = () => setPreviewVisible(false)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewVisible(true)
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList)

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <>
      <HighlightLabel title={t('sellerProducts.form.info.title')} />
      <Row gutter={[8, 8]}>
        <Col md={24}>
          <Form.Item
            label={t('sellerProducts.form.info.productPicture')}
            name="productPicture"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Form.Item>
        </Col>
        <Col md={24}>
          <Form.Item label={t('sellerProducts.form.info.videoProduct')} name="videoProduct">
            <Input maxLength={50} showCount />
          </Form.Item>
        </Col>
        <Col md={24}>
          <Form.Item
            label={t('sellerProducts.form.info.productName')}
            name="productName"
            rules={[
              {
                required: true
              }
            ]}
          >
            <TextArea rows={1} showCount maxLength={120} />
          </Form.Item>
        </Col>
        <Col md={24}>
          <Form.Item
            label={t('sellerProducts.form.info.productDetail')}
            name="productDetail"
            rules={[
              {
                required: true
              }
            ]}
          >
            <TextArea rows={3} showCount maxLength={500} />
          </Form.Item>
        </Col>
        <Col md={24}>
          <Form.Item
            label={t('sellerProducts.form.info.category')}
            name="category"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Select defaultValue="" style={{ width: 200 }}>
              <Option value="jack">Jack</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

Info.defaultProps = {
  value: false,
  onChange: undefined,
  onHintClick: undefined,
  disabled: false
}

export default Info
