import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
// import * as moment from 'moment';

// 假设你有一个类型ORM连接，这里我们不需要直接引用它，因为实体定义是独立的

@Entity('blog_config') // 指定数据库中的表名
export class Info extends BaseEntity {
  @PrimaryGeneratedColumn() // 主键，自增
  id: number;

  @Column({
    length: 55,
    nullable: false,
    default: '小张的博客',
    comment: '博客名称',
  })
  blog_name: string;

  @Column({
    nullable: false,
    default: 'https://mrzym.gitee.io/blogimg/html/rabbit.png',
    comment: '博客头像',
  })
  blog_avatar: string;

  @Column({ nullable: false, comment: '博客头像背景图' })
  avatar_bg: string;

  @Column({ nullable: false, comment: '个人签名' })
  personal_say: string;

  @Column({ nullable: true, comment: '博客公告' })
  blog_notice: string;

  @Column({ nullable: false, comment: 'qq链接' })
  qq_link: string;

  @Column({ nullable: false, comment: '微信链接' })
  we_chat_link: string;

  @Column({ nullable: false, comment: 'github链接' })
  github_link: string;

  @Column({ nullable: false, comment: 'git_ee链接' }) // 注意: 这里的命名可能需要更改，因为 git_ee 不是一个常见的命名
  git_ee_link: string;

  @Column({ nullable: false, comment: 'bilibili链接' })
  bilibili_link: string;

  @Column({
    type: 'bigint',
    nullable: false,
    default: 0,
    comment: '博客被访问的次数',
  })
  view_time: number;

  @Column({ nullable: true, comment: '微信群图片' })
  we_chat_group: string;

  @Column({ nullable: true, comment: 'qq群图片' })
  qq_group: string;

  @Column({ nullable: true, comment: '微信收款码' })
  we_chat_pay: string;

  @Column({ nullable: true, comment: '支付宝收款码' })
  ali_pay: string;

  // 如果你想在创建和更新时自动处理时间戳，你可以使用TypeORM的内置装饰器
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 注意：TypeORM 没有内置的 updatedAt 字段，但你可以通过监听器或钩子来自动更新它
  // 如果你需要 updatedAt 字段，可以像 createdAt 一样定义它，并使用 @UpdateDateColumn 装饰器（如果存在）
  // 或者，你可以使用 @BeforeUpdate 实体监听器来手动更新它
}
