import type { Control, FieldValues } from 'react-hook-form';

export type FormProps<T extends FieldValues> = {
  control: Control<T>;
};
