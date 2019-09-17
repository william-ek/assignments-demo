import { FeetAndInchesPipe } from './feet-and-inches.pipe';

describe('FeetAndInchesPipe', () => {
  it('create an instance', () => {
    const pipe = new FeetAndInchesPipe();
    expect(pipe).toBeTruthy();
  });
});
