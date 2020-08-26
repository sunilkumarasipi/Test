import { StudentTitlePipe } from './student-title.pipe';

describe('StudentTitlePipe', () => {
  it('create an instance', () => {
    const pipe = new StudentTitlePipe();
    expect(pipe).toBeTruthy();
  });
});
