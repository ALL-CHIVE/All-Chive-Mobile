import React from 'react'

import { CheckBox, Styles } from './Checkbox.style'

interface CheckboxProps {
  isChecked: boolean
}

/**
 * Checkbox
 */
const Checkbox = ({ isChecked }: CheckboxProps) => {
  return <CheckBox style={isChecked && Styles.checked} />
}

export default Checkbox
