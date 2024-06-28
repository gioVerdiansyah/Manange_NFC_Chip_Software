import React from 'react'
import PT from '../../../utils/PropType'
import { Link } from 'react-router-dom'

const BreadCrumbsItem = ({
    icon,
    text,
    path
}) => {
  return (
    <li>
    <a to={path}>
      {icon}
      {text}
    </a>
  </li>

  )
}

BreadCrumbsItem.propsType={
    icon: PT.node,
    text: PT.string,
    path: PT.string
}

export default BreadCrumbsItem