import { z } from 'zod';
import { repoSchema } from '../utils/validations';

export type Repo = z.infer<typeof repoSchema>;
