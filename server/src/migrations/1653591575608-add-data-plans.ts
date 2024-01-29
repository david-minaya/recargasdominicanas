import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDataPlans1653591575608 implements MigrationInterface {

  name = 'addDataPlans1653591575608'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`data_plan\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`price\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`data_plan\``);
  }
}
