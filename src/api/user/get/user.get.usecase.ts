import { Dto } from './user.get.types';
import { Errable } from '../../../infrastructure/types/Errable';

export default function validate(dto: Dto): Errable<Dto> {
  return dto;
}
