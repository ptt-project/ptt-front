import React, { useState, useEffect, FC, ReactNode } from 'react'
import { Typography, Button } from 'antd'

const { Text } = Typography

interface ISidebarContainerProps {
  children?: ReactNode
}

const SidebarContainer: FC<ISidebarContainerProps> = (props: ISidebarContainerProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    calcCollapsed()
    window.addEventListener('resize', calcCollapsed)

    return (): void => {
      window.removeEventListener('resize', calcCollapsed)
    }
  }, [])

  function calcCollapsed(): void {
    if (window.innerWidth >= 1200) {
      setCollapsed(false)
    } else {
      setCollapsed(true)
    }
  }

  function getClassName(): string {
    if (collapsed) {
      if (isOpen) {
        return 'hps-sidebar hps-sidebar__collapsed hps-sidebar__active'
      }
      return 'hps-sidebar hps-sidebar__collapsed'
    }
    return 'hps-sidebar'
  }

  function onClose(e: any): void {
    if (e.target.className === 'hps-sidebar__bar') {
      setIsOpen(false)
    }
  }

  return (
    <div className={getClassName()}>
      <div className="hps-sidebar__open">
        <Button
          icon={<i className="fas fa-chevron-right" />}
          size="large"
          onClick={(): void => setIsOpen(true)}
        />
      </div>
      <div className="hps-sidebar__bar" onClick={onClose} aria-hidden="true">
        <div className="hps-sidebar__close">
          <Text onClick={(): void => setIsOpen(false)}>
            <i className="d-icon-times" />
          </Text>
        </div>
        <div className="hps-sidebar__frame hps-scroll">{props.children}</div>
      </div>
    </div>
  )
}

SidebarContainer.defaultProps = {
  children: null
}

export default SidebarContainer
