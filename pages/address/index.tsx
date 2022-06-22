import React, { MutableRefObject, useCallback, useMemo, useRef, useState } from 'react'
import { Button, Form, FormItemProps, Input } from 'antd'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import GoogleMapReact from 'google-map-react'
import t from '~/locales'

interface IChangePasswordFromValues {
  password: string
  newPassword: string
  confirmNewPassword: string
}

// interface ISearchBoxProps {
//     placeholder:string
//     onPlacesChanged?: ()=>{}
// }
// const SearchBox: React.FC<ISearchBoxProps> = (props:ISearchBoxProps)=> {
//     const {onPlacesChanged}=props

//     handlePlacesChanged = () => {

//        onPlacesChanged?.(this.searchBox.getPlaces());
//     }
//     componentDidMount() {
//       var input = ReactDOM.findDOMNode(this.refs.input);
//       // eslint-disable-next-line no-undef
//       this.searchBox = new googlemaps.places.SearchBox(input);
//       this.searchBox.addListener('places_changed', this.onPlacesChanged);
//     }

//     return <input ref="input" placeholder={placeholder} type="text"/>;
//   }

const Marker: React.FC = () => (
  <svg width="25" height="32" viewBox="0 0 25 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.1333 0C5.50224 0 0.133301 5.37587 0.133301 12C0.133301 16.4448 1.63274 17.8338 9.58774 30.589C10.7618 32.4714 13.5061 32.4692 14.6788 30.589C22.638 17.8271 24.1333 16.4439 24.1333 12C24.1333 5.36894 18.7574 0 12.1333 0ZM12.1333 29C4.1693 16.2304 3.1333 15.4242 3.1333 12C3.1333 7.02944 7.16274 3 12.1333 3C17.1039 3 21.1333 7.02944 21.1333 12C21.1333 15.4096 20.1854 16.0891 12.1333 29ZM7.1333 12C7.1333 9.23856 9.37186 7 12.1333 7C14.8947 7 17.1333 9.23856 17.1333 12C17.1333 14.7614 14.8947 17 12.1333 17C9.37186 17 7.1333 14.7614 7.1333 12Z"
      fill="#DF1F29"
    />
  </svg>
)

const InputPassword: React.FC<FormItemProps> = (props: FormItemProps) => {
  const { label, name, rules } = props

  const [hidePassword, setHidePassword] = useState(false)

  const onHideIconClick: VoidFunction = useCallback(() => {
    setHidePassword((prev: boolean) => !prev)
  }, [])

  const SuffixIcon: typeof EyeInvisibleOutlined = useMemo(
    () => (hidePassword ? EyeInvisibleOutlined : EyeOutlined),
    [hidePassword]
  )

  return (
    <Form.Item label={label} name={name} rules={rules} requiredMark>
      <Input
        suffix={<SuffixIcon className="site-form-item-icon" onClick={onHideIconClick} />}
        type={hidePassword ? 'password' : 'text'}
      />
    </Form.Item>
  )
}

const Address: React.FC = () => {
  const googleMapRef: MutableRefObject<GoogleMapReact> = useRef<GoogleMapReact>()
  const [form] = Form.useForm<IChangePasswordFromValues>()
  const [markerCoords, setMarkerCoords] = useState<GoogleMapReact.Coords>()

  // eslint-disable-next-line @typescript-eslint/typedef
  const onGoogleMapChange = useCallback((value: GoogleMapReact.ChangeEventValue) => {
    const { center } = value
    setMarkerCoords(center)
  }, [])

  return (
    <div className="container">
      <h2 className="title title-center mb-10">{t('auth.changePassword.title')}</h2>
      <div>
        <Form
          layout="vertical"
          form={form}
          // initialValues={{ layout: formLayout }}
        >
          <InputPassword
            label={t('auth.changePassword.password')}
            name="password"
            rules={[
              {
                type: 'string',
                min: 8,
                max: 20,
                message: t('auth.changePassword.error.passwordFormatInValid')
              }
            ]}
            requiredMark
          />
          <InputPassword
            label={t('auth.changePassword.newPassword')}
            name="newPassword"
            rules={[
              {
                type: 'string',
                min: 8,
                max: 20,
                message: t('auth.changePassword.error.passwordFormatInValid')
              }
            ]}
            requiredMark
          />
          <InputPassword
            label={t('auth.changePassword.confirmNewPassword')}
            name="confirmNewPassword"
            rules={[
              {
                type: 'string',
                min: 8,
                max: 20,
                message: t('auth.changePassword.error.passwordFormatInValid')
              }
            ]}
            requiredMark
          />
          <div className="grey-section google-map" id="googlemaps" style={{ height: '386px' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyCQHZQtWvj22gP1S2sWCP158DHI3ldSxIc' }}
              defaultCenter={{ lat: 13.76, lng: 100.49 }}
              defaultZoom={11}
              onChange={onGoogleMapChange}
              ref={(ref: GoogleMapReact): void => {
                if (ref) googleMapRef.current = ref
              }}
              options={{
                streetView: false
              }}
            >
              {markerCoords && <Marker />}
            </GoogleMapReact>
          </div>
          <Form.Item noStyle>
            <pre>{JSON.stringify(markerCoords, null, 2)}</pre>
            {/* <p className="">{t('auth.changePassword.description')}</p> */}
          </Form.Item>
          <Form.Item noStyle>
            <Button className="btn btn-submit" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Address
