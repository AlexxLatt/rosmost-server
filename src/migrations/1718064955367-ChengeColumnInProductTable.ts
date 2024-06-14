import {MigrationInterface, QueryRunner} from "typeorm";

export class ChengeColumnInProductTable1718064955367 implements MigrationInterface {
    name = 'ChengeColumnInProductTable1718064955367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "tags" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "tags" text`);
    }

}
