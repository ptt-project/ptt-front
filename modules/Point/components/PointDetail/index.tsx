import React, { FC } from 'react'
import { Button, Row, Col,Typography,Card, List,Rate  } from 'antd'
import t from '~/locales'

const { Text } = Typography
const data = [
  {
    title: 'Hannah',
    orderID: '2006306N01XXFD',
    productName:'ดัมเบลหุ้มยาง 2 กิโลกรัม',
    status:'wait'
  },
  {
    title: 'Sophia',
    orderID: '2006306N01XXF1',
    productName:'ดัมเบลหุ้มยาง 2 กิโลกรัม',
    status:'reply'
  },
  {
    title: 'Kennocha',
    orderID: '2006306N01XXF2',
    productName:'ดัมเบลหุ้มยาง 2 กิโลกรัม',
    status:'wait'
  },
  {
    title: 'Caroline',
    orderID: '2006306N01XXF3',
    productName:'ดัมเบลหุ้มยาง 2 กิโลกรัม',
    status:'wait'
  },
];
const gridStyle: React.CSSProperties = {
  width: '33.2%',
  textAlign: 'center',
};
const PointDetail: FC = () => {
  return (
    <>
      <Row >
        <Button className='mr-1'>{t('shopPoint.all')}</Button>
        <Button className='mr-1'>{t('shopPoint.point.five')}</Button>
        <Button className='mr-1'>{t('shopPoint.point.four')}</Button>
        <Button className='mr-1'>{t('shopPoint.point.three')}</Button>
        <Button className='mr-1'>{t('shopPoint.point.two')}</Button>
        <Button className='mr-1'>{t('shopPoint.point.one')}</Button>  
      </Row>
      <Row className='hrTitleCol mt-4'>
        <Col lg={6}><Text type="danger">{t('shopPoint.productDetail')}</Text></Col>
        <Col lg={12}><Text type="danger">{t('shopPoint.reviewDetail')}</Text></Col>
        <Col lg={6}><Text type="danger">{t('shopPoint.yourReply')}</Text></Col>
      </Row>
      <List grid={{ gutter: 8, column: 1 }} dataSource={data} renderItem={item => (
        <List.Item>
          <Card className='mt-3' title={`${t('shopPoint.user')} ${item.title}`} extra={item.orderID}>
            <Card.Grid style={gridStyle}>{item.productName}</Card.Grid>
            <Card.Grid style={gridStyle}><Rate value={3}/></Card.Grid>
            <Card.Grid style={gridStyle}>
              {item.status ==='reply' ?
              <Button className='mr-1'>{t('shopPoint.reply')}</Button> 
              :'text'
              }
            </Card.Grid>
          </Card>
        </List.Item>
      )}
      />
    </>
  )
}

export default PointDetail
