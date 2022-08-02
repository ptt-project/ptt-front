import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload, Col, Form, Input, Row, Select } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import { UploadChangeParam } from 'antd/lib/upload'
import React, { useState } from 'react'
import HighlightLabel from '~/components/main/HighlightLabel'
import t from '~/locales'
import styles from '../SellerMyProductsForm.module.scss'

const { TextArea } = Input

interface IFormProductInfoProps {
  label?: string
  value?: boolean
  onChange?: (value: boolean) => void
  onHintClick?: () => void
  disabled?: boolean
}
const Info: React.FC<IFormProductInfoProps> = () => {
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<string>('')
  const [previewTitle, setPreviewTitle] = useState<string>('')
  const [filePhotoCoverList, setFilePhotoCoverList] = useState<UploadFile[]>([])
  const [fileList, setFileList] = useState<UploadFile[]>([])

  async function getBase64(file: RcFile): Promise<string> {
    return new Promise<string>((resolve: any, reject: any) => {
      const reader: FileReader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (): void => resolve(reader.result as string)
      reader.onerror = (error: ProgressEvent<FileReader>): void => reject(error)
    })
  }

  function handleCancel(): void {
    setPreviewVisible(false)
  }

  async function handlePreview(file: UploadFile): Promise<void> {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewVisible(true)
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
  }

  const handleChangePhotoCover: UploadProps['onChange'] = ({
    fileList: newFileList
  }: UploadChangeParam) => setFilePhotoCoverList(newFileList)

  const handleChangePhoto: UploadProps['onChange'] = ({
    fileList: newFileList
  }: UploadChangeParam) => setFileList(newFileList)

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
              maxCount={1}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={filePhotoCoverList}
              onPreview={handlePreview}
              onChange={handleChangePhotoCover}
              className={styles.uploadImg}
            >
              {filePhotoCoverList.length ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>{t('sellerProducts.form.info.photoCover')}</div>
                </div>
              )}
            </Upload>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChangePhoto}
              className={styles.uploadImg}
              maxCount={7}
            >
              {fileList.length >= 7 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>
                    {t('sellerProducts.form.info.picture')} (Max: 7)
                  </div>
                </div>
              )}
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
        <Col md={12}>
          <Form.Item
            label={t('sellerProducts.form.info.category')}
            name="category"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Select defaultValue="">
              <Select.Option value="">Jack</Select.Option>
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
