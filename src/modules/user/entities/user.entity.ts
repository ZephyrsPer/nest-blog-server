import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity('blog_user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true })
  username: string;

  @Column({ length: 64 })
  password: string;

  @Column({ default: 2, comment: '用户角色 1 管理员 2 普通用户' })
  role: number;

  @Column({ length: 255, nullable: true, default: '' })
  nick_name: string;

  @Column({ length: 255, nullable: true, default: '' })
  avatar: string;

  @Column({ length: 255, nullable: true, default: '' })
  qq: string;

  @Column({ length: 255, nullable: true, default: '' })
  ip: string;

  // 如果你想在创建和更新时自动处理时间戳，你可以使用TypeORM的内置装饰器
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
