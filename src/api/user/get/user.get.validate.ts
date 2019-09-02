import { Dto } from './user.get.types';
import { Errable } from '../../../infrastructure/types/Errable';
import httpError from "../../../infrastructure/HttpError";

export default function validate(dto: Dto): Errable<Dto> {
  return !dto.id ? httpError('no id', { status: 400 }) : dto;
}
