import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Demo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  // 如果有其他关联或复杂关系，可以在这里添加其他字段和装饰器

  // 例如，与Profile实体的关联
  // @OneToOne(() => Profile, (profile) => profile.user)
  // @JoinColumn()
  // profile: Profile;
}
