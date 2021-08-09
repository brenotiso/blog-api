import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabase1628281359099 implements MigrationInterface {
  name = 'InitDatabase1628281359099';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "author" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "nickname" character varying NOT NULL, "dateBirth" TIMESTAMP WITH TIME ZONE NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "publication" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "authorId" integer, CONSTRAINT "PK_8aea8363d5213896a78d8365fab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "publication" ADD CONSTRAINT "FK_152fc564787a7fc0f5456ad7dff" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "publication" DROP CONSTRAINT "FK_152fc564787a7fc0f5456ad7dff"`,
    );
    await queryRunner.query(`DROP TABLE "publication"`);
    await queryRunner.query(`DROP TABLE "author"`);
  }
}
