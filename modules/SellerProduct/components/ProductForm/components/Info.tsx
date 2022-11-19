import React, { FC, useState } from 'react'
import HighlightLabel from '~/components/main/HighlightLabel'
import styles from '../ProductForm.module.scss'
import { useTranslation } from 'next-i18next'
import { Upload, Col, Form, Input, Row, Select, Typography, FormInstance } from 'antd'
import { RcFile } from 'antd/es/upload'
import { UploadFile } from 'antd/es/upload/interface'
import { UploadChangeParam } from 'antd/lib/upload'
import { ImageAcceptConst, LocaleNamespaceConst } from '~/constants'
import { ConfigService } from '../../../../../services'
import { IConfigOptionPlatformCategory, IProductInfo } from '../../../../../interfaces'
import { HelperGetImageUtil, OptionKeyLabelUtil } from '../../../../../utils/main'
import { ImageSizeEnum } from '../../../../../enums'
import { NextRouter, useRouter } from 'next/router'

const { Text } = Typography

interface IInfoProps {
  form: FormInstance
  productInfo?: IProductInfo
}

const Info: FC<IInfoProps> = (props: IInfoProps) => {
  const router: NextRouter = useRouter()
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])
  const { data: configOptions } = ConfigService.useGetConfigOptions()
  const [fileList, setFileList] = useState<UploadFile[]>(getDefaultImages)

  function getDefaultImages(): UploadFile[] {
    const files: UploadFile[] = []

    if (props.productInfo?.productProfile) {
      props.productInfo.productProfile.imageIds.forEach((id: string) => {
        files.push({
          uid: id,
          name: id,
          status: 'done',
          url: HelperGetImageUtil(id, ImageSizeEnum.THUMBNAIL)
        })
      })
    }

    return files
  }

  function normFile(e: any): any {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  function onChange({ fileList: newFileList }: UploadChangeParam<UploadFile<any>>): void {
    setFileList(newFileList)
  }

  async function onPreview(file: UploadFile): Promise<void> {
    let src: string = file.url
    if (!src) {
      src = await new Promise((resolve: any) => {
        const reader: FileReader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = (): any => resolve(reader.result as string)
      })
    }
    const image: HTMLImageElement = new Image()
    image.src = src
    const imgWindow: Window = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  return (
    <>
      <HighlightLabel title={t('seller.product:form.info.title')} />
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={t('seller.product:form.info.productPicture')}
            name="images"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: `${t('common:form.required')} ${t(
                  'seller.product:form.info.productPicture'
                )}`
              }
            ]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              accept={ImageAcceptConst.toString()}
            >
              {fileList.length < 7 ? (
                <div className={styles.upload}>
                  <Text type="secondary">
                    <i className="fas fa-plus" />
                  </Text>
                  <Text type="secondary">
                    {t('seller.product:form.info.picture')} {fileList.length + 1}
                  </Text>
                </div>
              ) : null}
            </Upload>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label={t('seller.product:form.info.videoProduct')} name="videoLink">
            <Input maxLength={50} showCount />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={t('seller.product:form.info.productName')}
            name="name"
            rules={[
              {
                required: true,
                message: `${t('common:form.required')} ${t('seller.product:form.info.productName')}`
              }
            ]}
          >
            <Input.TextArea rows={1} showCount maxLength={120} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={t('seller.product:form.info.productDetail')}
            name="detail"
            rules={[
              {
                required: true,
                message: `${t('common:form.required')} ${t(
                  'seller.product:form.info.productDetail'
                )}`
              }
            ]}
          >
            <Input.TextArea rows={3} showCount maxLength={500} />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item
            label={t('seller.product:form.info.category')}
            name="platformCategoryId"
            rules={[
              {
                required: true,
                message: `${t('common:form.required')} ${t('seller.product:form.info.category')}`
              }
            ]}
          >
            <Select>
              <Select.Option value="">{t('common:form.option')}</Select.Option>
              {configOptions?.platformCategory.map((category: IConfigOptionPlatformCategory) => (
                <Select.Option key={category.value} value={category.value}>
                  {category[OptionKeyLabelUtil(router)]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

export default Info
