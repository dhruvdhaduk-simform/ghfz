import z from 'zod';

export const userNameSchema = z.string().trim().nonempty();
export const repoNameSchema = z.string().trim().nonempty();

export const userNameListSchema = z.array(userNameSchema);
export const repoNameListSchema = z.array(repoNameSchema);

export const repoSchema = z.object({
    username: userNameSchema,
    reponame: repoNameSchema,
});

export const repoListSchema = z.array(repoSchema);
