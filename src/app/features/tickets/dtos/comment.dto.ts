import {UserDto} from '../../../shared/dtos/user.dto';

export interface CommentDto {
  _id: string;
  content: string;
  userId: UserDto;
  createdAt: string;
}
