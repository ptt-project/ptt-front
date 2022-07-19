import { useCallback, useState } from 'react'
import { TreeProps } from 'react-d3-tree/lib/Tree/types'
import { Point } from 'react-d3-tree/lib/types/common'

type IDimension = TreeProps['dimensions']
type IContainerRefFunction = (elm: HTMLDivElement) => void
type IUseCenteredTreeReturn = [IDimension, Point, IContainerRefFunction]

export const useCenteredTree = (
  defaultTranslate: Point = { x: 0, y: 0 }
): IUseCenteredTreeReturn => {
  const [translate, setTranslate] = useState<Point>(defaultTranslate)
  const [dimensions, setDimensions] = useState<IDimension>()
  const containerRef: IContainerRefFunction = useCallback(
    (containerElem?: HTMLDivElement): void => {
      if (containerElem) {
        const { width, height } = containerElem.getBoundingClientRect()
        setDimensions({ width, height })
        setTranslate({ x: width / 2, y: 40 })
      }
    },
    []
  )
  return [dimensions, translate, containerRef]
}
