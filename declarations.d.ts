declare module '*.sass';
declare module '*.scss';
declare module '*.css';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.svg';

declare type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
