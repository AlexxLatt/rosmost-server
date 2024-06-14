import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnImgInProduct1718023202437 implements MigrationInterface {
    name = 'AddColumnImgInProduct1718023202437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "img" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ADD "admin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "admin"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "img"`);
    }

}
