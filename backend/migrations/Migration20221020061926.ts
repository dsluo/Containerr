import { Migration } from '@mikro-orm/migrations';

export class Migration20221020061926 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `node` (`id` json not null, `name` text not null, `parent_id` json null, constraint `node_parent_id_foreign` foreign key(`parent_id`) references `node`(`id`) on delete set null on update cascade, primary key (`id`));');
    this.addSql('create index `node_parent_id_index` on `node` (`parent_id`);');
  }

}
