import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnClonedOnProductsTable1717785621577 implements MigrationInterface {
    name = 'AddColumnClonedOnProductsTable1717785621577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "cloned" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "cloned"`);
    }

}
