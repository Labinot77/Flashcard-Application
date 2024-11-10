import { z } from "zod";

export const ShareModalSchema = z.object({ 
  classes:z.array(z.string()).min(1),
})