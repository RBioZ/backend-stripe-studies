module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: ['dist/modules/**/entities/*.entity.js'],
  migrations: ['dist/shared/infra/typeorm/migrations/*.js'],
  cli: {
    migrationsDir: 'src/shared/infra/typeorm/migrations',
  },
};
