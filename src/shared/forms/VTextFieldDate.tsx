import React, { useEffect, useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';

const formatDate = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})\d*/, '$1');
};

type VTextFieldDateProps = TextFieldProps & {
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const VTextFieldDate: React.FC<VTextFieldDateProps> = ({ name, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
      clearValue: () => setValue('')
    });
  }, [registerField, fieldName, value]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(formatDate(event.target.value));
    rest.onChange?.(event);
  };

  return (
    <TextField
      {...rest}
      fullWidth
      error={!!error}
      helperText={error}
      value={value}
      onChange={handleDateChange}
      onKeyDown={() => error && clearError()}
      inputProps={{ maxLength: 10 }}
    />
  );
};
