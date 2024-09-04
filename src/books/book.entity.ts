import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Stock } from 'src/stock/stock.entity';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  title!: string;
  @Column()
  author!: string;
  @Column({ default: true })
  status: boolean;
  @OneToOne(() => Stock, {
    cascade: ['insert'],
    eager: true,
  })
  @JoinColumn()
  stock: Stock;

  constructor(author: string, title: string, stock: Stock) {
    super();
    this.author = author;
    this.title = title;
    this.stock = stock;
  }
}
