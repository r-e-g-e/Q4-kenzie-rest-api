import {MigrationInterface, QueryRunner} from "typeorm";

export class tablesMigration1649093514829 implements MigrationInterface {
    name = 'tablesMigration1649093514829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userIdId" uuid, CONSTRAINT "REL_dc407efd3b293b62d35e60c252" UNIQUE ("userIdId"), CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "itens" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_b090d1e0e0721a15b3f9f0c6f0e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item_cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "cartIdId" uuid, "itemIdId" integer, CONSTRAINT "PK_779afeffcc43f0b363ed633d3f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_dc407efd3b293b62d35e60c252d" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "item_cart" ADD CONSTRAINT "FK_1f28ae32bfb2d67742a3ce3d4db" FOREIGN KEY ("cartIdId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item_cart" ADD CONSTRAINT "FK_59a95a515ec9a769c31c0e0e32d" FOREIGN KEY ("itemIdId") REFERENCES "itens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_cart" DROP CONSTRAINT "FK_59a95a515ec9a769c31c0e0e32d"`);
        await queryRunner.query(`ALTER TABLE "item_cart" DROP CONSTRAINT "FK_1f28ae32bfb2d67742a3ce3d4db"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_dc407efd3b293b62d35e60c252d"`);
        await queryRunner.query(`DROP TABLE "item_cart"`);
        await queryRunner.query(`DROP TABLE "itens"`);
        await queryRunner.query(`DROP TABLE "carts"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
