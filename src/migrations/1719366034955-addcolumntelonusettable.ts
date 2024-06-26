import {MigrationInterface, QueryRunner} from "typeorm";

export class addcolumntelonusettable1719366034955 implements MigrationInterface {
    name = 'addcolumntelonusettable1719366034955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "tel" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tel"`);
    }

}
