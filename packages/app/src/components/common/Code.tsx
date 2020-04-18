import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {rainbow as theme} from 'react-syntax-highlighter/dist/esm/styles/hljs'

import styles from './Code.module.css'

interface Props {
  children: string
  language: string
  maxHeight?: number
}

const Code = ({children, language, maxHeight}: Props) => (
  <div className={styles.container}>
    <SyntaxHighlighter
      language={language}
      style={theme}
      customStyle={{maxHeight}}
    >
      {children}
    </SyntaxHighlighter>
  </div>
)

export default Code
