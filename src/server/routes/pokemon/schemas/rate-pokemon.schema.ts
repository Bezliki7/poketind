import { z } from 'zod';

export default z.object({
  id: z.number(),
  rate: z.enum(['like', 'dislike'])
});
