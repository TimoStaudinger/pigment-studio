import React from 'react'
import {useParams, useHistory, generatePath} from 'react-router-dom'
import {Tabs, TabList, Tab, TabPanels, TabPanel} from '@reach/tabs'

import '@reach/tabs/styles.css'
import styles from './Workbench.module.css'

interface Props {
  areas: [string, React.ReactNode][]
}

const Workbench = ({areas}: Props) => {
  let {view, ...params} = useParams()
  let history = useHistory()

  // let selectedView = view ?? areas?.[0]?.[0]

  return (
    <Tabs
      className={styles.container}
      index={(view && parseInt(view, 10)) || 0}
      onChange={(view) =>
        history.push(
          generatePath('/:paletteId?/:colorIndex?/:shadeIndex?/:view?', {
            ...params,
            view
          })
        )
      }
    >
      <TabList className={styles.tabbar}>
        {areas.map(([name]) => (
          <Tab key={name}>{name}</Tab>
        ))}
      </TabList>
      <TabPanels className={styles.content}>
        {areas.map(([name, content]) => (
          <TabPanel key={name}>{content}</TabPanel>
        ))}
      </TabPanels>{' '}
    </Tabs>
  )
}
export default Workbench
