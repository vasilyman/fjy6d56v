import React from 'react';
import type { FC, HTMLProps, ReactNode } from 'react';

type HTMLPropsWithClassName<T> = HTMLProps<T> & { className?: string };

type TVariableHTMLElementProps<T extends HTMLElement> = {
  is: string;
  children?: ReactNode;
} & HTMLPropsWithClassName<T>;

export const VariableHTMLElement: FC<TVariableHTMLElementProps<HTMLLinkElement | HTMLButtonElement>> = ({
  is,
  children,
  ...props
}) => React.createElement(is, props, children);
