import { Dto } from './user.get.types';
import { Errable } from '../../../infrastructure/types/Errable';
import httpError from "../../../utils/api/httpError";

export default function validate(todoMe: Dto): Errable<Dto> {
  throw new Error('hi')
  return !todoMe.id ? httpError('no id', 400) : todoMe;
}
