/**
 * Здесь код с ошибками типов. Нужно их устранить
 * */

// Мы это не проходили, но по тексту ошибки можно понять, как это починить
export const getFakeApi = async (): Promise<void> => {
  const result = await fetch('https://jsonplaceholder.typicode.com/todos/1').then((response) => response.json());
  console.log(result);
};

// Мы это не проходили, но по тексту ошибки можно понять, как это починить
export class SomeClass {
  set: Set<number>;
  channel: BroadcastChannel;

  constructor() {
    this.set = new Set([1]);
    this.channel = new BroadcastChannel('test-broadcast-channel');
  }
}

export type Data = DataMoney | DataPercent;

export type DataValue = Money | Percent;

type DataMoney = {
  type: 'Money';
  value: Money;
};

type DataPercent = {
  type: 'Percent';
  value: Percent;
};

export type Money = {
  currency: string;
  amount: number;
};

export type Percent = {
  percent: number;
};

// Здесь, возможно, нужно использовать as, возможно в switch передавать немного по-другому
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getDataAmountOrPercent = (data: Data): number => {
  switch (data.type) {
    case 'Money':
      return data.value.amount;
    case 'Percent':
      return data.value.percent;

    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const unhandled = (data as { type: string }).type; // тут кажется информативнее выводить неизвестный тип, чем весь объект
      throw new Error(`unknown type: ${unhandled}`);
    }
  }
};
