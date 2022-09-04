import { useTranslation } from 'next-i18next'
import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload, Col, Form, Input, Row, Select } from 'antd'
import { RcFile, UploadProps } from 'antd/es/upload'
import { UploadFile } from 'antd/es/upload/interface'
import { UploadChangeParam } from 'antd/lib/upload'
import React, { FC, useState } from 'react'
import HighlightLabel from '~/components/main/HighlightLabel'
import { LocaleNamespaceConst } from '~/constants'
import styles from '../ProductForm.module.scss'

const { TextArea } = Input

const Info: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])
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
      <HighlightLabel title={t('seller.product:form.info.title')} />
      <Row>
        <Col span={24}>
          <Form.Item
            label={t('seller.product:form.info.productPicture')}
            name="productPicture"
            rules={[{ required: true }]}
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
                  <div style={{ marginTop: 8 }}>{t('seller.product:form.info.photoCover')}</div>
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
                    {t('seller.product:form.info.picture')} (Max: 7)
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
        <Col span={24}>
          <Form.Item label={t('seller.product:form.info.videoProduct')} name="videoProduct">
            <Input maxLength={50} showCount />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={t('seller.product:form.info.productName')}
            name="productName"
            rules={[{ required: true }]}
          >
            <TextArea rows={1} showCount maxLength={120} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={t('seller.product:form.info.productDetail')}
            name="productDetail"
            rules={[{ required: true }]}
          >
            <TextArea rows={3} showCount maxLength={500} />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item
            label={t('seller.product:form.info.category')}
            name="category"
            rules={[{ required: true }]}
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

export default Info
