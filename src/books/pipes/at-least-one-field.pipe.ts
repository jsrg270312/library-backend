import { 
    PipeTransform,
    Injectable, 
    ArgumentMetadata, 
    BadRequestException 
} from '@nestjs/common';
import { UpdateBookDto } from '../dto/update-book.dto';

@Injectable()
export class AtLeastOneFieldPipe implements PipeTransform {
  transform(value: UpdateBookDto, metadata: ArgumentMetadata) {
    const values = Object.values(value);
    const areValuesUndefined = values.every(field => field === undefined);
    this.validateValues(areValuesUndefined)
    return value;
  }
  private validateValues(areValuesUndefined: boolean) {
    if (areValuesUndefined) 
      throw new BadRequestException('At least one field must be provided');
  }
}
