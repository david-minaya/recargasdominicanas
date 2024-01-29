import { MigrationInterface, QueryRunner } from 'typeorm';

export class transfer1696378356639 implements MigrationInterface {

  name = 'transfer1696378356639'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`profit_withdrawal\` (\`id\` int NOT NULL AUTO_INCREMENT, \`withdrawalId\` int NULL, UNIQUE INDEX \`REL_43592d29b2062411d5fb2ce0a9\` (\`withdrawalId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`CREATE TABLE \`transfer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`depositId\` int NULL, \`withdrawalId\` int NULL, \`taxesId\` int NULL, \`brcdId\` int NULL, UNIQUE INDEX \`REL_f153028cf1c5905df93e0bad14\` (\`depositId\`), UNIQUE INDEX \`REL_962a9889907e3a83571bba2150\` (\`withdrawalId\`), UNIQUE INDEX \`REL_6616b9a82812bba55c641c9977\` (\`taxesId\`), UNIQUE INDEX \`REL_c4d1718123d47941bd2851cf7f\` (\`brcdId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`ALTER TABLE \`profit_withdrawal\` ADD CONSTRAINT \`FK_43592d29b2062411d5fb2ce0a96\` FOREIGN KEY (\`withdrawalId\`) REFERENCES \`withdrawal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`transfer\` ADD CONSTRAINT \`FK_f153028cf1c5905df93e0bad144\` FOREIGN KEY (\`depositId\`) REFERENCES \`deposit\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`transfer\` ADD CONSTRAINT \`FK_962a9889907e3a83571bba21506\` FOREIGN KEY (\`withdrawalId\`) REFERENCES \`withdrawal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`transfer\` ADD CONSTRAINT \`FK_6616b9a82812bba55c641c99775\` FOREIGN KEY (\`taxesId\`) REFERENCES \`profit_withdrawal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`transfer\` ADD CONSTRAINT \`FK_c4d1718123d47941bd2851cf7f6\` FOREIGN KEY (\`brcdId\`) REFERENCES \`profit_withdrawal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`transfer\` DROP FOREIGN KEY \`FK_c4d1718123d47941bd2851cf7f6\``);
    await queryRunner.query(`ALTER TABLE \`transfer\` DROP FOREIGN KEY \`FK_6616b9a82812bba55c641c99775\``);
    await queryRunner.query(`ALTER TABLE \`transfer\` DROP FOREIGN KEY \`FK_962a9889907e3a83571bba21506\``);
    await queryRunner.query(`ALTER TABLE \`transfer\` DROP FOREIGN KEY \`FK_f153028cf1c5905df93e0bad144\``);
    await queryRunner.query(`ALTER TABLE \`profit_withdrawal\` DROP FOREIGN KEY \`FK_43592d29b2062411d5fb2ce0a96\``);
    await queryRunner.query(`DROP INDEX \`REL_c4d1718123d47941bd2851cf7f\` ON \`transfer\``);
    await queryRunner.query(`DROP INDEX \`REL_6616b9a82812bba55c641c9977\` ON \`transfer\``);
    await queryRunner.query(`DROP INDEX \`REL_962a9889907e3a83571bba2150\` ON \`transfer\``);
    await queryRunner.query(`DROP INDEX \`REL_f153028cf1c5905df93e0bad14\` ON \`transfer\``);
    await queryRunner.query(`DROP TABLE \`transfer\``);
    await queryRunner.query(`DROP INDEX \`REL_43592d29b2062411d5fb2ce0a9\` ON \`profit_withdrawal\``);
    await queryRunner.query(`DROP TABLE \`profit_withdrawal\``);
  }
}
