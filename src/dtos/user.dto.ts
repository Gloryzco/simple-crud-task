import { z } from 'zod';

const CreateDto = z.object({
  username: z
    .string({
        required_error: "username is required",
        invalid_type_error: "username must be a string",
      })
    .min(4, { message: 'Username must be at least 4 characters long' })
    .max(20, { message: 'Username cannot be longer than 20 characters' }),
  email: z.string({
    required_error: "email is required",
    invalid_type_error: "email must be a string",
  }).email({ message: 'Invalid email format' }),
});

const UserResponseDTO = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
});

export { UserResponseDTO, CreateDto };
