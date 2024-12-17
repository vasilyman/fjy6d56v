/**
 * Функции написанные здесь пригодятся на последующих уроках
 * С помощью этих функций мы будем добавлять элементы в список для проверки динамической загрузки
 * Поэтому в идеале чтобы функции возвращали случайные данные, но в то же время не абракадабру.
 * В целом сделайте так, как вам будет удобно.
 * */

/**
 * Категория
 * */
class Category {
  constructor(public id: string, public name: string, public photo: string) {}
}

/**
 * Продукт
 * */
class Product {
  constructor(
    public id: string,
    public name: string,
    public photo: string,
    public createdAt: string,
    public price: number,
    public category: Category,
    public oldPrice?: number,
    public desc?: string
  ) {}
}

/**
 * Операция (Operation) может быть либо тратой (Cost), либо доходом (Profit)
 * */
class Operation {
  constructor(
    public id: string,
    public name: string,
    public createdAt: string,
    public amount: number,
    public category: Category, // TODO: вероятно тут должен быть product
    public type: 'Cost' | 'Profit',
    public desc?: string
  ) {}
}

const getRandNum = (n: number): number => Math.floor(Math.random() * 10 ** n);
const getRandString = (n: number): string => `${getRandNum(n)}`;
const getRandType = (): 'Cost' | 'Profit' => (Math.random() > 0.5 ? 'Cost' : 'Profit');

/**
 * Создает случайный продукт (Product).
 * Принимает дату создания (строка)
 * */
export const createRandomProduct = (createdAt: string): Product => {
  const category = new Category(getRandString(6), getRandString(6), getRandString(6));
  return new Product(getRandString(6), getRandString(6), getRandString(6), createdAt, getRandNum(6), category);
};

/**
 * Создает случайную операцию (Operation).
 * Принимает дату создания (строка)
 * */
export const createRandomOperation = (createdAt: string): Operation => {
  const category = new Category(getRandString(6), getRandString(6), getRandString(6));
  return new Operation(getRandString(6), getRandString(6), createdAt, getRandNum(6), category, getRandType());
};
