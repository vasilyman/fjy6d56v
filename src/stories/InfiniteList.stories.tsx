import type { Meta } from '@storybook/react';
import { InfiniteList } from '../shared/infiniteList';
import { OperationShort } from '../widgets/operationShort';
import React from 'react';
import { useArgs } from '@storybook/preview-api';

type Item = {
  id: string;
  sum: number;
  type: string;
  title: string;
  description: string;
};

const items: Item[] = [];

const getItems = () => {
  items.push(
    ...Array(10)
      .fill(0)
      .map((_, i) => ({
        id: `${items.length + i}`,
        sum: 200,
        type: 'type',
        title: `Operation ${items.length + i}`,
        description: 'Operation description',
      }))
  );

  return items;
};

const meta: Meta<typeof InfiniteList<Item>> = {
  title: 'Components/InfiniteList',
  component: InfiniteList,
  decorators: [
    (Story) => (
      <div style={{ minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onScrollEnd() {
      updateArgs({ items: getItems() });
    }

    return <InfiniteList {...args} onScrollEnd={onScrollEnd} />;
  },
  args: {
    items,
    ItemComponent: OperationShort,
    onScrollEnd: getItems,
  },
};

export default meta;

export const Default = {
  args: {},
};
