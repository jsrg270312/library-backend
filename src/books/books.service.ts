import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { StockService } from 'src/stock/stock.service';
import { Stock } from 'src/stock/stock.entity';
import { BooksRepository } from './books.repository';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    private stockService: StockService,
    private booksRepository: BooksRepository,
  ) {}

  create(createBookDto: CreateBookDto) {
    const { author, title, quantity } = createBookDto;
    const stock = this.stockService.create(quantity);
    const book = new Book(author, title, stock);
    return this.booksRepository.createBook(book);
  }

  findAll(): Promise<Book[]> {
    return this.booksRepository.getAllBooks();
  }

  async findOne(id: number): Promise<Book> {
    return this.booksRepository.getBook(id);
  }

  async processUpdate(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.findOne(id);
    const { quantity } = updateBookDto;
    await this.updateStockQuantity(quantity, book.stock);
    delete updateBookDto.quantity;
    await this.modifyCurrentBook(book, updateBookDto);
    return this.booksRepository.getBook(id);
  }

  private async updateStockQuantity(
    quantity: number | undefined,
    stock: Stock,
  ) {
    if (quantity) {
      await this.stockService.updateQuantity(quantity, stock);
    }
  }

  private async modifyCurrentBook(book: Book, updateBookDto: UpdateBookDto) {
    if (this.hasUpdates(updateBookDto)) {
      const updatedBook = Object.assign(book, updateBookDto);
      await this.booksRepository.updateBook(updatedBook);
    }
  }

  private hasUpdates(updateBookDto: UpdateBookDto): boolean {
    const hasUpdates = Object.values(updateBookDto).some(
      (field) => field !== undefined,
    );
    return hasUpdates;
  }

  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    await this.booksRepository.deleteBook(id);
    await this.stockService.deleteStock(book.stock.id);
  }
}
