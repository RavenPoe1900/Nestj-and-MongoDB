import { Injectable } from '@nestjs/common';
import { mongoConfig } from 'config/config';

@Injectable()
export class AppService {
  // inject any config or sub-config you like
  constructor(
  ) {}

  // enjoy type safety!
  public show() {
    // const out = [
    //   `root.name: ${this.config.database.table.name}`,
    //   `root.database.name: ${this.databaseConfig.table.name}`,
    //   `root.database.table.name: ${this.tableConfig.name}`,
    // ].join('\n');

    // return `${out}\n`;
    return {
      mongo: mongoConfig
    }
  }
  getHello(): string {
    return 'Hello World!';
  }
}
