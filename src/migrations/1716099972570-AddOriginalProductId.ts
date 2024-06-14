import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOriginalProductId1716099972570 implements MigrationInterface {
    name = 'AddOriginalProductId1716099972570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "originalProductId" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "originalProductId"`);
    }

}
