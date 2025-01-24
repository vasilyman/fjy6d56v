import React, { ChangeEvent, FC, useContext } from 'react';
import cn from 'clsx';
import { Field, FieldContext } from '../field';

interface Input {
  id?: string;
  onChange?: (e: string) => void;
  className?: string;
  type?: 'text' | 'password' | 'email' | 'phone';
  value?: string;
}

const InputElement: FC<Input> = ({ id, onChange, className, type, value }) => {
  const { fieldStyleModule } = useContext(FieldContext);

  return (
    <input
      id={id}
      type={type ?? 'text'}
      value={value}
      className={cn(fieldStyleModule['field__input'], className)}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  );
};
/**
 * Primary UI component for user interaction
 */
export const Input: FC<Input> = ({ id, onChange, className, type }) => {
  return (
    <Field>
      {/* TODO: проп дриллинг получился */}
      <InputElement id={id} onChange={onChange} className={className} type={type} />
    </Field>
  );
};
