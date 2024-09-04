import { Injectable } from '@nestjs/common';
import { Stock } from './stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
  ) {}

  create(quantity: number): Stock {
    const stock = new Stock(quantity);
    return stock;
  }

  async updateQuantity(newQuantity: number, stock: Stock): Promise<void> {
    stock.quantity = newQuantity;
    await this.stockRepository.save(stock);
  }

  async deleteStock(id: number): Promise<void> {
    await this.stockRepository.delete(id);
  }
}
