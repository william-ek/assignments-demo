import { CustomerAddressPipe } from './customer-address.pipe';

describe('CustomerAddressPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomerAddressPipe();
    expect(pipe).toBeTruthy();
  });
});
