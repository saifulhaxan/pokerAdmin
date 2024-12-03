import React from 'react'
import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDashboard } from '@fortawesome/free-solid-svg-icons'

const CustomButton = (props) => {
  return (
    <>
      {
        props?.icon ? (
          <button type={props?.type} disabled={props?.disabled} className={`customButton ${props?.variant} ${props?.className}`} onClick={props?.onClick}>{props?.text} <FontAwesomeIcon icon={props?.icon} /></button>
        ) : (
          <button type={props?.type} disabled={props?.disabled} className={`customButton ${props?.variant} ${props?.className}`} onClick={props?.onClick}>{props?.text} </button>
        )
      }
    </>
  )
}
export default CustomButton;
