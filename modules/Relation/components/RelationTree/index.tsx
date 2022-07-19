/* eslint-disable @typescript-eslint/typedef */
import React, { SyntheticEvent, useCallback } from 'react'
import Tree from 'react-d3-tree'
import { CustomNodeElementProps, RawNodeDatum, TreeLinkDatum } from 'react-d3-tree/lib/types/common'
import { useCenteredTree } from './helper'
import styles from './RelationTree.module.scss'

interface IRelationTreeProps {
  data: RawNodeDatum
}
const RelationTree: React.FC<IRelationTreeProps> = (props: IRelationTreeProps) => {
  const [dimensions, translate, containerRef] = useCenteredTree()

  const getDynamicPathClass = useCallback((link: TreeLinkDatum): string => {
    const { target } = link
    return styles[`tree-path-${target.depth}`]
  }, [])

  const renderNodeWithCustomEvents = useCallback(
    (elmProps: CustomNodeElementProps): JSX.Element => {
      const { hierarchyPointNode, nodeDatum, toggleNode, onNodeClick } = elmProps
      const { depth } = hierarchyPointNode

      function onClick(e: SyntheticEvent): void {
        onNodeClick(e)
        toggleNode()
      }
      return (
        <g className={styles[`tree-node-${depth}`]}>
          <circle r="10" onClick={onClick} />
          <text className={styles.treeNodeText} x="14" y="2">
            {nodeDatum.name}
          </text>
        </g>
      )
    },
    []
  )

  return (
    <div id="treeWrapper" ref={containerRef} className={styles.relationTreeLayout}>
      <Tree
        data={props.data}
        orientation="vertical"
        pathFunc="diagonal"
        initialDepth={3}
        depthFactor={0}
        scaleExtent={{ max: 1.5, min: 0.8 }}
        zoom={1}
        rootNodeClassName={styles.root}
        branchNodeClassName={styles.branch}
        leafNodeClassName={styles.leaf}
        translate={translate}
        dimensions={dimensions}
        pathClassFunc={getDynamicPathClass}
        renderCustomNodeElement={renderNodeWithCustomEvents}
      />
    </div>
  )
}

export default RelationTree
