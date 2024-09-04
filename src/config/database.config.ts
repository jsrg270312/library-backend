import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export async function databaseConfig(
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> {
  const { host, port, database, username, password } =
    configService.get('database');
  return {
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    retryDelay: 3000,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
  };
}
