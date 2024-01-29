import { MigrationInterface, QueryRunner } from 'typeorm';

export class invoice1680310278830 implements MigrationInterface {

  name = 'invoice1680310278830'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`provider_product\` CHANGE \`percent\` \`profit\` decimal NOT NULL DEFAULT '0.00'`);
    await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`percent\` \`profit\` decimal NULL`);
    await queryRunner.query(`CREATE TABLE \`contract\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nic\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_191a80a1632c632eb9a8a339d4\` (\`nic\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`contractId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`provider_product\` CHANGE \`profit\` \`profit\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
    await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`type\` \`type\` enum ('Recarga', 'Paquetico', 'Pin', 'Factura') NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`profit\` \`profit\` decimal(10,2) NULL`);
    await queryRunner.query(`ALTER TABLE transaction MODIFY amount decimal(10,2) NOT NULL;`);
    await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_d246554c12d32ef78934bdc6abd\` FOREIGN KEY (\`contractId\`) REFERENCES \`contract\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_d246554c12d32ef78934bdc6abd\``);
    await queryRunner.query(`ALTER TABLE transaction MODIFY amount int NOT NULL;`);
    await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`profit\` \`profit\` decimal NULL`);
    await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`type\` \`type\` enum ('Recarga', 'Paquetico', 'Pin') NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`provider_product\` CHANGE \`profit\` \`profit\` decimal NOT NULL DEFAULT '0.00'`);
    await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`contractId\``);
    await queryRunner.query(`DROP INDEX \`IDX_191a80a1632c632eb9a8a339d4\` ON \`contract\``);
    await queryRunner.query(`DROP TABLE \`contract\``);
    await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`profit\` \`percent\` decimal NULL`);
    await queryRunner.query(`ALTER TABLE \`provider_product\` CHANGE \`profit\` \`percent\` decimal NOT NULL DEFAULT '0.00'`);
  }
}
