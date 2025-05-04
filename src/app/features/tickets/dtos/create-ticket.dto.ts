export interface CreateTicketDto {
  title: string;
  description: string;
  category: string;
  priority: string;
  assignedTo: number;
}
