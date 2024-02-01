import zod from "zod";

export const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
  });
  
export const loginBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
  });
  
export const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
  });