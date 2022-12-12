import { GovernmentModule } from './government.module';

describe('GovernmentModule', () => {
  let governmentModule: GovernmentModule;

  beforeEach(() => {
    governmentModule = new GovernmentModule();
  });

  it('should create an instance', () => {
    expect(governmentModule).toBeTruthy();
  });
});
