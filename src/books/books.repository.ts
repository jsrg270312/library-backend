import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.entity';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksRepository extends Repository<Book> {
  constructor(private dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  async createBook(book: Book): Promise<Book> {
    return this.save(book);
  }

  async getBook(id: number): Promise<Book> {
    const book = await this.findOneBy({ id });
    if (!book) throw new NotFoundException(`Book not found`);
    return book;
  }

  async getAllBooks(): Promise<Book[]> {
    return this.find();
  }

  async deleteBook(id: number): Promise<any> {
    return this.delete(id);
  }

  async updateBook(updatedBook: Book): Promise<void> {
    await this.save(updatedBook);
  }
}
