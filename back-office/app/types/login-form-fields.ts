import * as Yup from 'yup';
import { loginSchema } from '../schemas/login-form-schema';

export type LoginFormFields = Yup.InferType<typeof loginSchema>;
