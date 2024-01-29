import { MigrationInterface, QueryRunner } from 'typeorm';

export class session1691614648985 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`
      UPDATE \`session\`
      INNER JOIN admin on admin.userId = \`session\`.\`data\`->'$.adminUserId'
      SET \`session\`.\`data\` = JSON_SET(\`session\`.\`data\`, '$.userId', admin.userId, '$.role', "admin")
    `);

    await queryRunner.query(`
      UPDATE \`session\`
      INNER JOIN customer on customer.userId = \`session\`.\`data\`->'$.customerUserId'
      SET \`session\`.\`data\` = JSON_SET(\`session\`.\`data\`, '$.userId', customer.userId, '$.role', "customer")
    `);

    await queryRunner.query(`
      UPDATE \`session\`
      INNER JOIN business_user on business_user.userId = \`session\`.\`data\`->'$.businessUserId'
      SET \`session\`.\`data\` = JSON_SET(\`session\`.\`data\`, '$.userId', business_user.userId, '$.role', "businessUser")
    `);

    await queryRunner.query(`
      UPDATE \`session\` 
      SET \`session\`.\`data\` = JSON_REMOVE(\`session\`.\`data\`, '$.adminUserId', '$.customerUserId', '$.businessUserId')
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

  }
}
