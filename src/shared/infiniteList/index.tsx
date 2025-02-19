import React, { createRef, FC, PropsWithChildren, RefObject, useEffect, useRef, useState } from 'react';
import cn from 'clsx';

type InfiniteListProps<T extends { id: string } & PropsWithChildren> = {
  items: T[];
  ItemComponent: React.ComponentType<T>;
  onScrollEnd?: () => void;
};

const Fallback = ({ height }: { height?: number }) => {
  return <div style={{ height: height ? `${height}px` : '100px' }} />;
};

export const InfiniteList = <T extends { id: string } & PropsWithChildren>({
  items,
  ItemComponent,
  onScrollEnd,
}: InfiniteListProps<T>) => {
  const [viewed, setViewed] = useState(() => new Map<Element, { height: number; show: boolean }>());

  const itemRefs = useRef<RefObject<HTMLDivElement>[]>([]);
  itemRefs.current = items.map((_, i) => itemRefs.current[i] ?? createRef());

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      rootMargin: '0px 0px 100px 0px',
      threshold: 0,
    };

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.target === endRef.current) {
          if (!entry.isIntersecting) return;
          if (onScrollEnd) onScrollEnd();
          return;
        }

        if (entry.isIntersecting) {
          setViewed((viewed) => {
            const old = viewed.get(entry.target);
            viewed.set(entry.target, { ...old, show: true });
            return new Map(viewed);
          });
        } else {
          setViewed((viewed) => {
            const height = entry.target.getBoundingClientRect().height;
            viewed.set(entry.target, { height, show: false });
            return new Map(viewed);
          });
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    for (const target of itemRefs.current) {
      observer.observe(target.current);
    }

    observer.observe(endRef.current);

    return () => {
      observer.disconnect();
    };
  }, [itemRefs, onScrollEnd]);

  return (
    <>
      {items.map((item, i) => (
        <div ref={itemRefs.current[i]} key={item.id}>
          {viewed.get(itemRefs.current[i].current)?.show ? (
            <ItemComponent {...item} />
          ) : (
            <Fallback height={viewed.get(itemRefs.current[i].current)?.height} />
          )}
        </div>
      ))}
      <div ref={endRef} />
    </>
  );
};
