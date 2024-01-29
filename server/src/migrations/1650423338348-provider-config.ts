import {MigrationInterface, QueryRunner} from "typeorm";

export class providerConfig1650423338348 implements MigrationInterface {
    name = 'providerConfig1650423338348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`provider_config\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, \`providerId\` int NULL, UNIQUE INDEX \`IDX_3145fa800807128484449b1b86\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`provider_config\` ADD CONSTRAINT \`FK_5f7cd509a960f1dbde0ab805322\` FOREIGN KEY (\`providerId\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`provider_config\` DROP FOREIGN KEY \`FK_5f7cd509a960f1dbde0ab805322\``);
        await queryRunner.query(`DROP INDEX \`IDX_3145fa800807128484449b1b86\` ON \`provider_config\``);
        await queryRunner.query(`DROP TABLE \`provider_config\``);
    }

}
