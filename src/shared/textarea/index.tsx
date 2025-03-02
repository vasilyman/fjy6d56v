import React, { ChangeEvent, FC, useContext } from 'react';
import cn from 'clsx';
import { Field, FieldContext } from '../field';
type TextareaElement = {
  id?: string;
  className?: string;
  rows?: number;
  value?: string;
  error?: boolean;
  disabled?: boolean;
  onChange?: (e: string) => void;
  onBlur?: (e: FocusEvent) => void;
};

type Textarea = Omit<TextareaElement, 'error'> & {
  label?: string;
  error?: string;
  messages?: string[];
};

const TextareaElement: FC<TextareaElement> = ({ id, className, rows, value, error, disabled, onChange, onBlur }) => {
  const { fieldStyleModule } = useContext(FieldContext);

  return (
    <textarea
      id={id}
      rows={rows ?? 3}
      value={value}
      disabled={disabled}
      className={cn(fieldStyleModule['field__textarea'], className, error && fieldStyleModule['field__textarea_error'])}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
      onBlur={(e) => onBlur && onBlur(e.nativeEvent)}
    />
  );
};

const MessagesElement: FC<Pick<Textarea, 'messages'>> = ({ messages }) => {
  return <>{messages?.length > 0 && messages.map((message, i) => <p key={i}>{message}</p>)}</>;
};

const ErrorElement: FC<Pick<Textarea, 'error'>> = ({ error }) => {
  const { fieldStyleModule } = useContext(FieldContext);

  return !!error && <p className={fieldStyleModule['field__error']}>{error}</p>;
};

const LabelElement: FC<Pick<Textarea, 'label'>> = ({ label }) => {
  const { fieldStyleModule } = useContext(FieldContext);

  return !!label && <label className={fieldStyleModule['field__label']}>{label}</label>;
};

/**
 * Primary UI component for user interaction
 */
export const Textarea: FC<Textarea> = ({
  id,
  className,
  rows,
  value,
  error,
  messages,
  label,
  disabled,
  onChange,
  onBlur,
}) => {
  return (
    <Field>
      {label && <LabelElement label={label} />}
      <TextareaElement
        id={id}
        className={className}
        rows={rows}
        value={value}
        error={!!error}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error ? <ErrorElement error={error} /> : <MessagesElement messages={messages} />}
    </Field>
  );
};
