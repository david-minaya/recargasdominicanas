import { MigrationInterface, QueryRunner } from 'typeorm';

export class deleteSystemSalesReport1702000551574 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('provider_sales_report', true, true, true);
        await queryRunner.dropTable('system_sales_report', true, true, true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
