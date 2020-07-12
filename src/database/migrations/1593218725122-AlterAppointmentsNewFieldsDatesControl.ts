import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AlterAppointmentsNewFieldsDatesControl1593218725122 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumns('appointments', [
        new TableColumn(
          {
            name: "created_at",
            type: "timestamp",
            default: 'now()',
          },
        ),
        new TableColumn(
          {
            name: 'updated_at',
            type: "timestamp",
            default: 'now()',
          }
        )
      ]);

      await queryRunner.dropColumn('appointments', 'id');
      await queryRunner.addColumn('appointments', new TableColumn({
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumns('appointments', [
        new TableColumn({name: 'id', type: 'uuid'}),
        new TableColumn({name: 'created_at', type: 'timestamp'}),
        new TableColumn({name: 'updated_at', type: 'timestamp'}),
      ]);
      await queryRunner.addColumn('appointments', new TableColumn({
        name: 'id',
        type: 'varchar',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }));
    }
}

