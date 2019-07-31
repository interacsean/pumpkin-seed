import { Request } from 'express';
import fallback from '../../../utils/dataTransform/fallback';
import { Dto } from './user.get.types';

export default function toDto(req: Request): Dto {
  return {
    id: fallback((_req) => _req.params.id, null, req),
  };
}
