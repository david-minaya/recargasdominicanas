import { MigrationInterface, QueryRunner } from 'typeorm';

export class appRelease1665797104168 implements MigrationInterface {
  
  name = 'appRelease1665797104168'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`release_note\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`appReleaseId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`CREATE TABLE \`app_release\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` datetime NOT NULL, \`appVersionId\` int NULL, UNIQUE INDEX \`REL_8cec3da8808ab7ec121b73ac57\` (\`appVersionId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`CREATE TABLE \`app_version\` (\`id\` int NOT NULL AUTO_INCREMENT, \`version\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, UNIQUE INDEX \`IDX_c570aedd3131b74fd3ca74b5e6\` (\`version\`), UNIQUE INDEX \`IDX_58c0eb2c1b9e14c2301390b60a\` (\`path\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`ALTER TABLE \`release_note\` ADD CONSTRAINT \`FK_3c87aa29fd39b1031be30928170\` FOREIGN KEY (\`appReleaseId\`) REFERENCES \`app_release\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`app_release\` ADD CONSTRAINT \`FK_8cec3da8808ab7ec121b73ac57b\` FOREIGN KEY (\`appVersionId\`) REFERENCES \`app_version\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`app_release\` DROP FOREIGN KEY \`FK_8cec3da8808ab7ec121b73ac57b\``);
    await queryRunner.query(`ALTER TABLE \`release_note\` DROP FOREIGN KEY \`FK_3c87aa29fd39b1031be30928170\``);
    await queryRunner.query(`DROP INDEX \`IDX_58c0eb2c1b9e14c2301390b60a\` ON \`app_version\``);
    await queryRunner.query(`DROP INDEX \`IDX_c570aedd3131b74fd3ca74b5e6\` ON \`app_version\``);
    await queryRunner.query(`DROP TABLE \`app_version\``);
    await queryRunner.query(`DROP INDEX \`REL_8cec3da8808ab7ec121b73ac57\` ON \`app_release\``);
    await queryRunner.query(`DROP TABLE \`app_release\``);
    await queryRunner.query(`DROP TABLE \`release_note\``);
  }
}
