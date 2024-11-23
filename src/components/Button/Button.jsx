import React from 'react'

const Button = ({Id, Key, ...otherprops}) => {
  return (
    <button id={Id} {...otherprops} > {Key}</button>
  )
}

export default Button