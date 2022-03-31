import {MigrationInterface, QueryRunner} from "typeorm";

export class tablesMigration1648750820108 implements MigrationInterface {
    name = 'tablesMigration1648750820108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "itens" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_b090d1e0e0721a15b3f9f0c6f0e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item_card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "cartIdId" uuid, "itemIdId" integer, CONSTRAINT "PK_69d96e0450e40231e187f5b7748" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userIdId" uuid, CONSTRAINT "REL_dc407efd3b293b62d35e60c252" UNIQUE ("userIdId"), CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "item_card" ADD CONSTRAINT "FK_b86553612aac6756551a0f01c35" FOREIGN KEY ("cartIdId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item_card" ADD CONSTRAINT "FK_b827746bc827d465cf4c8d7d916" FOREIGN KEY ("itemIdId") REFERENCES "itens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_dc407efd3b293b62d35e60c252d" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_dc407efd3b293b62d35e60c252d"`);
        await queryRunner.query(`ALTER TABLE "item_card" DROP CONSTRAINT "FK_b827746bc827d465cf4c8d7d916"`);
        await queryRunner.query(`ALTER TABLE "item_card" DROP CONSTRAINT "FK_b86553612aac6756551a0f01c35"`);
        await queryRunner.query(`DROP TABLE "carts"`);
        await queryRunner.query(`DROP TABLE "item_card"`);
        await queryRunner.query(`DROP TABLE "itens"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
