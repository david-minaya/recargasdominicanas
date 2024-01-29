import { MigrationInterface, QueryRunner } from 'typeorm';

export class notificationToken1663895675812 implements MigrationInterface {

  name = 'notificationToken1663895675812'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`notification_token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`ALTER TABLE \`notification_token\` ADD CONSTRAINT \`FK_8c1dede7ba7256bff4e6155093c\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`notification_token\` DROP FOREIGN KEY \`FK_8c1dede7ba7256bff4e6155093c\``);
    await queryRunner.query(`DROP TABLE \`notification_token\``);
  }
}
