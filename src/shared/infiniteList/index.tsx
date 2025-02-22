import React, { isValidElement, PropsWithChildren, useEffect, useRef } from 'react';
import $style from './style.module.scss';

type InfiniteListProps<T extends { id: string; pending?: boolean } & PropsWithChildren> = {
  items: T[];
  ItemComponent: React.ComponentType<T>;
  FallbackComponent?: React.ComponentType;
  onScrollEnd?: () => void;
};

const Fallback = () => {
  return <div className={$style['infinite-list__fallback']}>Loading...</div>;
};

export const InfiniteList = <T extends { id: string; pending?: boolean } & PropsWithChildren>({
  items,
  ItemComponent,
  FallbackComponent,
  onScrollEnd,
}: InfiniteListProps<T>) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      rootMargin: '200px 0px 200px 0px',
      threshold: 0,
    };

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.target === endRef.current) {
          if (!entry.isIntersecting) return;
          if (onScrollEnd) onScrollEnd();
          return;
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    observer.observe(endRef.current);

    return () => {
      observer.disconnect();
    };
  }, [onScrollEnd, items]);

  return (
    <>
      {items.map((item) =>
        item.pending ? (
          FallbackComponent ? (
            <FallbackComponent key={`fallback-${item.id}`} />
          ) : (
            <Fallback key={`fallback-${item.id}`} />
          )
        ) : (
          <ItemComponent key={`component-${item.id}`} {...item} />
        )
      )}
      <div ref={endRef} className={$style['infinite-list__end']} />
    </>
  );
};
