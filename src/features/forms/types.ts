import type { Control, FieldValues, Path } from 'react-hook-form';

export type FormProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
};

export type ControlProps<T extends FieldValues> = {
  control: Control<T>;
};
