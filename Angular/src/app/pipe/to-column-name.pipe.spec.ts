import { ToColumnNamePipe } from './to-column-name.pipe';

describe('ToColumnNamePipe', () => {
  it('create an instance', () => {
    const pipe = new ToColumnNamePipe();
    expect(pipe).toBeTruthy();
  });
});
