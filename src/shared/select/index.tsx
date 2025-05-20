import React, { FC, useContext } from 'react';
import cn from 'clsx';
import {
  ErrorElement,
  ErrorProps,
  Field,
  FieldContext,
  LabelElement,
  LabelProps,
  MessageProps,
  MessagesElement,
} from '../field';

type SelectItem = {
  title: string;
  value: string;
};

type SelectElementProps = {
  id?: string;
  className?: string;
  value?: string;
  error?: boolean;
  disabled?: boolean;
  onChange?: (e: string) => void;
  onBlur?: (e: FocusEvent) => void;
  items: SelectItem[];
  name?: string;
};

type SelectProps = Omit<SelectElementProps, 'error'> &
  ErrorProps &
  MessageProps &
  LabelProps & {
    loading?: boolean;
  };

const SelectElement: FC<SelectElementProps> = ({
  id,
  className,
  value,
  error,
  disabled,
  onChange,
  items,
  name,
  onBlur,
}) => {
  const { fieldStyleModule } = useContext(FieldContext);

  return (
    <select
      name={name}
      id={id}
      value={value}
      disabled={disabled}
      className={cn(fieldStyleModule['field__input'], className, error && fieldStyleModule['field__input_error'])}
      onChange={(e) => onChange && onChange(e.target.value)}
      onBlur={(e) => onBlur && onBlur(e.nativeEvent)}
      defaultValue=""
    >
      <option value="" disabled />
      {items.map((item) => (
        <option key={item.value} value={item.value}>
          {item.title}
        </option>
      ))}
    </select>
  );
};

export const Select: FC<SelectProps> = ({
  items,
  className,
  id,
  name,
  label,
  error,
  onChange,
  disabled,
  value,
  onBlur,
  messages,
}) => {
  return (
    <Field>
      {label && <LabelElement label={label} />}
      <SelectElement
        name={name}
        id={id}
        items={items}
        error={!!error}
        className={className}
        onChange={onChange}
        disabled={disabled}
        value={value}
        onBlur={onBlur}
      />
      {error ? <ErrorElement error={error} /> : <MessagesElement messages={messages} />}
    </Field>
  );
};
