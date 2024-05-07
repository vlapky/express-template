import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { TypeOf, z } from 'zod';

const env = dotenv.config();
dotenvExpand.expand(env);

const zodEnv = z.object({
  PORT: z.string(),
  DOMAIN: z.string(),
  GOOGLE_CALLBACK: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  JWT_SECRET_KEY: z.string(),
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends TypeOf<typeof zodEnv> {}
  }
}

const processEnvValidate = (env: NodeJS.ProcessEnv) => {
  try {
    zodEnv.parse(env);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const { fieldErrors } = err.flatten();
      const errorMessage = Object.entries(fieldErrors)
        .map(([field, errors]) =>
          errors ? `${field}: ${errors.join(', ')}` : field
        )
        .join('\n  ');
      throw new Error(`Missing environment variables:\n  ${errorMessage}`);
    }
  }
};

processEnvValidate(process.env);
