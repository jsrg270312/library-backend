import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stock extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ default: 0 })
  quantity!: number;

  constructor(quantity: number) {
    super();
    this.quantity = quantity;
  }
}
