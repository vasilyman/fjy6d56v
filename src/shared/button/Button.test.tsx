import React from 'react';
import { Button } from './Button';
import { fireEvent, render, screen } from '@testing-library/react';

describe('button component', () => {
  test('rendered button is correct', () => {
    render(<Button label="Label" />);

    expect(screen.getByRole('button').tagName.toLocaleLowerCase()).toContain('button');
    expect(screen.getByRole('button').textContent).toContain('Label');
  });

  test('native click by button is call onClick prop method', () => {
    const handleClick = jest.fn();
    render(<Button label="Label" onClick={handleClick} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
