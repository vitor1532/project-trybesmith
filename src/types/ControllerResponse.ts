import { Response } from 'express';

export type ControllerResponse = Promise<Response | undefined>;