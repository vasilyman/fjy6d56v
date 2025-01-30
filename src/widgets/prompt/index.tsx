import type { ChangeEvent, FC } from 'react';
import React, { useState } from 'react';
import { Button, Input, Modal } from '../../shared';

export const Prompt: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const onClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Input value={value} onChange={(e: string) => setValue(e)} />
      <Button label="OK" onClick={onClick} />
      <Modal visible={isOpen} onClose={() => setIsOpen(false)}>
        <p>Entered value is: {value}</p>
      </Modal>
    </>
  );
};
