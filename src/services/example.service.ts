import { ExampleDao } from '../repositories';

export interface ExampleServiceConfig {
  exampleDao: ExampleDao;
}

export class ExampleService {
  // Example service methods here
  private readonly exampleDao: ExampleDao;
  constructor(config: ExampleServiceConfig) {
    this.exampleDao = config.exampleDao;
  }
}
