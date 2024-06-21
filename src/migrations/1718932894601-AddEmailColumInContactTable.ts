import {MigrationInterface, QueryRunner} from "typeorm";

export class AddEmailColumInContactTable1718932894601 implements MigrationInterface {
    name = 'AddEmailColumInContactTable1718932894601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "email"`);
    }

}
