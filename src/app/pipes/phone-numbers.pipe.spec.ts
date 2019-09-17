import { PhoneNumbersPipe } from './phone-numbers.pipe';

describe('PhoneNumbersPipe', () => {
  it('create an instance', () => {
    const pipe = new PhoneNumbersPipe();
    expect(pipe).toBeTruthy();
  });
});
