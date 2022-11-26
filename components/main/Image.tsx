import { ImageAspectRatioPercentUtil } from '../../utils/main'

interface IImageProps {
  className?: string
  style?: React.CSSProperties
  rootClassName?: string
  rootStyle?: React.CSSProperties
  src?: string
  alt?: string
  ratio?: number
  size?: number
}

const defaultSrc: string = '/assets/images/main/empty.png'
const defaultAlt: string = 'image blank'

const Image: React.FC<IImageProps> = (props: IImageProps) => {
  if (props.ratio) {
    const containerStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      paddingTop: ImageAspectRatioPercentUtil(props.ratio, {
        suffix: true
      })
    }

    const imgStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }

    return (
      <div className={props.rootClassName} style={{ ...props.rootStyle, ...containerStyle }}>
        <img
          className={props.className}
          style={{ ...props.style, ...imgStyle }}
          src={props.src || defaultSrc}
          alt={props.alt || defaultAlt}
        />
      </div>
    )
  }

  const style: React.CSSProperties = { ...props.style }

  if (props.size) {
    style.width = props.size
    style.height = props.size
    style.objectFit = 'cover'
  }

  return (
    <img
      className={props.className}
      style={style}
      src={props.src || defaultSrc}
      alt={props.alt || defaultAlt}
    />
  )
}

Image.defaultProps = {
  className: undefined,
  style: {},
  rootClassName: undefined,
  rootStyle: {},
  src: '',
  alt: ''
}

export default Image
