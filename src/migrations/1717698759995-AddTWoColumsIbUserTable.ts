import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTWoColumsIbUserTable1717698759995 implements MigrationInterface {
    name = 'AddTWoColumsIbUserTable1717698759995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "passportSeries" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ADD "passportCode" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passportCode"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passportSeries"`);
    }

} 
