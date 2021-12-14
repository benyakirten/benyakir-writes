import { useState } from 'react';

import { validate } from '@Utils/validation';

const useValidation: ValidationHook = (valFns, initialValue = '', initialValidity = false) => {
  const [value, _setValue] = useState(initialValue);
  const [valid, setValidity] = useState(initialValidity);
  const setValue = (newValue: string | number) => {
    const validInput = validate(newValue, valFns)
    setValidity(validInput ? true : false);
    _setValue(newValue);
  }
  return [value, setValue, valid]
}

export default useValidation;