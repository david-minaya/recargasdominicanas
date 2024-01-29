import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateAppRelease1675815903598 implements MigrationInterface {

  name = 'updateAppRelease1675815903598'

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`ALTER TABLE \`app_release\` ADD \`version\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`app_release\` ADD \`filename\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`app_release\` ADD \`path\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`app_release\` ADD \`published\` tinyint NOT NULL DEFAULT 0`);

    await queryRunner.query(`
      UPDATE 
        app_release,
        app_version
      SET
        app_release.version = app_version.version,
        app_release.path = app_version.path,
        app_release.filename = CONCAT('recargas-dominicanas-', app_version.version, '.apk')
      WHERE
        app_release.appVersionId = app_version.id
    `);

    await queryRunner.query(`ALTER TABLE \`app_release\` DROP FOREIGN KEY \`FK_8cec3da8808ab7ec121b73ac57b\``);
    await queryRunner.query(`DROP INDEX \`REL_8cec3da8808ab7ec121b73ac57\` ON \`app_release\``);
    await queryRunner.query(`ALTER TABLE \`app_release\` DROP COLUMN \`appVersionId\``);
    await queryRunner.query(`ALTER TABLE \`app_release\` ADD UNIQUE INDEX \`IDX_5787050173c8a136651df77d2f\` (\`version\`)`);
    await queryRunner.query(`ALTER TABLE \`app_release\` ADD UNIQUE INDEX \`IDX_751aa40f52e3eedf35210993f0\` (\`path\`)`);
    await queryRunner.query('DROP TABLE app_version');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`app_release\` DROP COLUMN \`published\``);
    await queryRunner.query(`ALTER TABLE \`app_release\` DROP INDEX \`IDX_751aa40f52e3eedf35210993f0\``);
    await queryRunner.query(`ALTER TABLE \`app_release\` DROP COLUMN \`path\``);
    await queryRunner.query(`ALTER TABLE \`app_release\` DROP COLUMN \`filename\``);
    await queryRunner.query(`ALTER TABLE \`app_release\` DROP INDEX \`IDX_5787050173c8a136651df77d2f\``);
    await queryRunner.query(`ALTER TABLE \`app_release\` DROP COLUMN \`version\``);
    await queryRunner.query(`ALTER TABLE \`app_release\` ADD \`appVersionId\` int NULL`);
    await queryRunner.query(`CREATE UNIQUE INDEX \`REL_8cec3da8808ab7ec121b73ac57\` ON \`app_release\` (\`appVersionId\`)`);
    await queryRunner.query(`ALTER TABLE \`app_release\` ADD CONSTRAINT \`FK_8cec3da8808ab7ec121b73ac57b\` FOREIGN KEY (\`appVersionId\`) REFERENCES \`app_version\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }
}
