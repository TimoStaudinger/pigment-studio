import React from 'react'
import {Tabs, TabList, Tab, TabPanels, TabPanel} from '@reach/tabs'

import '@reach/tabs/styles.css'
import styles from './Workbench.module.css'

interface Props {
  views: [string, React.ReactNode][]
  selectedView: number | null
  selectView: (view: number) => void
}

const Workbench = ({views, selectedView, selectView}: Props) => (
  <Tabs
    className={styles.container}
    index={selectedView ?? 0}
    onChange={selectView}
  >
    <TabList className={styles.tabbar}>
      {views.map(([name]) => (
        <Tab key={name}>{name}</Tab>
      ))}
    </TabList>
    <TabPanels className={styles.content}>
      {views.map(([name, content]) => (
        <TabPanel key={name}>{content}</TabPanel>
      ))}
    </TabPanels>{' '}
  </Tabs>
)

export default Workbench
