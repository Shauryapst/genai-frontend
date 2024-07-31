import React from 'react'
import ReactMarkdown from 'react-markdown'
const Markdown = ({text}) => {
  return (
    <ReactMarkdown>{text}</ReactMarkdown>
  )
}

export default Markdown