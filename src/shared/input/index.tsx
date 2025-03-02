import React, { ChangeEvent, FC, useContext } from 'react';
import cn from 'clsx';
import { Field, FieldContext } from '../field';
type InputElement = {
  id?: string;
  className?: string;
  type?: 'text' | 'password' | 'email' | 'phone' | 'number';
  value?: string;
  error?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  onChange?: (e: string) => void;
  onBlur?: (e: FocusEvent) => void;
};

type Input = Omit<InputElement, 'error'> & {
  error?: string;
  messages?: string[];
  label?: string;
};

const InputElement: FC<InputElement> = ({
  id,
  className,
  type,
  value,
  error,
  disabled,
  min,
  max,
  onChange,
  onBlur,
}) => {
  const { fieldStyleModule } = useContext(FieldContext);

  return (
    <input
      id={id}
      type={type ?? 'text'}
      value={value}
      disabled={disabled}
      min={min}
      max={max}
      className={cn(fieldStyleModule['field__input'], className, error && fieldStyleModule['field__input_error'])}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      onBlur={(e) => onBlur && onBlur(e.nativeEvent)}
    />
  );
};

const MessagesElement: FC<Pick<Input, 'messages'>> = ({ messages }) => {
  return <>{messages?.length > 0 && messages.map((message, i) => <p key={i}>{message}</p>)}</>;
};

const ErrorElement: FC<Pick<Input, 'error'>> = ({ error }) => {
  const { fieldStyleModule } = useContext(FieldContext);

  return !!error && <p className={fieldStyleModule['field__error']}>{error}</p>;
};

const LabelElement: FC<Pick<Input, 'label'>> = ({ label }) => {
  const { fieldStyleModule } = useContext(FieldContext);

  return !!label && <label className={fieldStyleModule['field__label']}>{label}</label>;
};

/**
 * Primary UI component for user interaction
 */
export const Input: FC<Input> = ({
  id,
  className,
  type,
  value,
  error,
  messages,
  label,
  disabled,
  min,
  max,
  onChange,
  onBlur,
}) => {
  return (
    <Field>
      {label && <LabelElement label={label} />}
      <InputElement
        id={id}
        className={className}
        type={type}
        value={value}
        error={!!error}
        disabled={disabled}
        min={min}
        max={max}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error ? <ErrorElement error={error} /> : <MessagesElement messages={messages} />}
    </Field>
  );
};
