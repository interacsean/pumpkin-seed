import { Request } from 'express';
import {RequestVars} from "./RequestVars";

export type RequestOf<ReqVars extends RequestVars> = Request & ReqVars;
