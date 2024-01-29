import { MigrationInterface, QueryRunner } from 'typeorm';

export class tempPassword1687567686603 implements MigrationInterface {

  name = 'tempPassword1687567686603'

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`CREATE TABLE \`temp_password\` (\`id\` int NOT NULL AUTO_INCREMENT, \`password\` varchar(255) NOT NULL, \`expirationDate\` datetime NOT NULL, \`userId\` int NULL, UNIQUE INDEX \`IDX_284194e7480d0dc3f5164aad59\` (\`password\`), UNIQUE INDEX \`REL_94a6b7f526bba1f39ed144108b\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`ALTER TABLE \`access_token\` ADD UNIQUE INDEX \`IDX_70ba8f6af34bc924fc9e12adb8\` (\`token\`)`);
    await queryRunner.query(`ALTER TABLE \`temp_password\` ADD CONSTRAINT \`FK_94a6b7f526bba1f39ed144108b2\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query('INSERT INTO role(id, name) VALUES("CUSTOMER", "Cliente")');
    await queryRunner.query('UPDATE `user`, `customer` SET `user`.roleId = "CUSTOMER" WHERE `user`.id = `customer`.userId');

    await queryRunner.query(`
      UPDATE \`session\`
      INNER JOIN admin on admin.userId = \`session\`.\`data\`->'$.userId'
      SET \`session\`.\`data\` = JSON_SET(\`session\`.\`data\`, '$.adminUserId', admin.userId)
    `);

    await queryRunner.query(`
      UPDATE \`session\`
      INNER JOIN business_user on business_user.userId = \`session\`.\`data\`->'$.userId'
      SET \`session\`.\`data\` = JSON_SET(\`session\`.\`data\`, '$.businessUserId', business_user.userId)
    `);

    await queryRunner.query(`
      UPDATE \`session\`
      INNER JOIN customer on customer.userId = \`session\`.\`data\`->'$.userId'
      SET \`session\`.\`data\` = JSON_SET(\`session\`.\`data\`, '$.customerUserId', customer.userId)
    `);

    await queryRunner.query(`
      UPDATE \`session\` 
      SET \`session\`.\`data\` = JSON_REMOVE(\`session\`.\`data\`, '$.userId')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`temp_password\` DROP FOREIGN KEY \`FK_94a6b7f526bba1f39ed144108b2\``);
    await queryRunner.query(`ALTER TABLE \`access_token\` DROP INDEX \`IDX_70ba8f6af34bc924fc9e12adb8\``);
    await queryRunner.query(`DROP INDEX \`REL_94a6b7f526bba1f39ed144108b\` ON \`temp_password\``);
    await queryRunner.query(`DROP INDEX \`IDX_284194e7480d0dc3f5164aad59\` ON \`temp_password\``);
    await queryRunner.query(`DROP TABLE \`temp_password\``);
  }
}
