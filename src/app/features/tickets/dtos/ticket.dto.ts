import {UserDto} from '../../../shared/dtos/user.dto';
import {CommentDto} from './comment.dto';

export interface TicketDto {
  _id: number;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  owner: UserDto;
  assignedTo: UserDto;
  comments: CommentDto[];
  updatedAt: string;
  createdAt: string;
}
