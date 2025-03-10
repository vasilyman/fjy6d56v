import { accountService, TAccountRequest, type TOrderPositionRequest } from '.';
import { ECustomerType } from '../customerType';
import { EProductType } from '../productType';

describe('account sevice', () => {
  const customerBase = {
    id: '01',
  };

  const productBase = {
    id: '01',
    title: 'title',
  };

  test('discount percent for PREMIUM user on FOOD is 5', () => {
    expect(accountService.getDiscountPercent(ECustomerType.PREMIUM, EProductType.FOOD)).toEqual(5);
  });

  test('discount percent for GOLD user on TOY is 15', () => {
    expect(accountService.getDiscountPercent(ECustomerType.GOLD, EProductType.TOY)).toEqual(15);
  });

  describe('discount for PREMIUM user on TOY for 150RUB and 10pcs', () => {
    const orderPosition: TOrderPositionRequest = {
      order: 0,
      product: { ...productBase, sum: 150, type: EProductType.TOY },
      qty: 10,
    };

    test('150*10 - 150*10*0.1 = 150', () => {
      expect(accountService.calcOrderPosition(orderPosition, ECustomerType.PREMIUM).discount).toEqual(150);
    });

    test('150*10*(1 - 0.1)=1350', () => {
      expect(accountService.calcOrderPosition(orderPosition, ECustomerType.PREMIUM).salePriceTotal).toEqual(1350);
    });
  });

  test('sale price for GOLD user on CAR for 250RUB and 10pcs is 250*10*(1 - 0.05)=2375', () => {
    const orderPosition: TOrderPositionRequest = {
      order: 0,
      product: { ...productBase, sum: 250, type: EProductType.CAR },
      qty: 10,
    };

    expect(accountService.calcOrderPosition(orderPosition, ECustomerType.GOLD).salePriceTotal).toEqual(2375);
  });

  describe('discount for GOLD user on CAR for 10*1250RUB and TOY for 5*50RUB', () => {
    const orderPositionCar: TOrderPositionRequest = {
      order: 0,
      product: { ...productBase, sum: 1250, type: EProductType.CAR },
      qty: 10,
    };

    const orderPositionToy: TOrderPositionRequest = {
      order: 0,
      product: { ...productBase, sum: 50, type: EProductType.TOY },
      qty: 5,
    };

    const account: TAccountRequest = {
      customer: { ...customerBase, type: ECustomerType.GOLD },
      orderPositions: [orderPositionCar, orderPositionToy],
    };

    test('(1250*10*0.05 + 50*5*0.15) = 625+37.5 = 662.5', () => {
      expect(accountService.addAccount(account).discount).toEqual(662.5);
    });

    test('(1250*10*(1 - 0.05) + 50*5*(1 - 0.15)) = 11875+212.5 = 12087.5', () => {
      expect(accountService.addAccount(account).salePriceTotal).toEqual(12087.5);
    });
  });
});
