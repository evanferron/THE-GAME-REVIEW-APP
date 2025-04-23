import { ValidatorErrorsLogin, ValidatorErrorsRegister } from '../../../interfaces/errors/Auth';
import { loginSchema, registerSchema } from '@utils/validation/models/user';



/**
 * Fonction de validation du form de Login
 *
 * @param {string} email
 * @param {string} password
 */
export const validateLogin = (email: string, password: string): ValidatorErrorsLogin | null => {
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
        const formattedErrors: ValidatorErrorsLogin = {
            email: result.error.format().email?._errors[0] ?? null,
            password: result.error.format().password?._errors[0] ?? null,
        };

        return formattedErrors;
    }

    return null;
};

/**
 * Fonction de validation du form d'inscription
 *
 * @param {string} email
 * @param {string} pseudo
 * @param {string} password
 * @param {string} confirmPassword
 */
export const validateRegister = (
    email: string,
    pseudo: string,
    password: string,
    confirmPassword: string
): ValidatorErrorsRegister | null => {
    const result = registerSchema.safeParse({ email, pseudo, password, confirmPassword });
    
    if (!result.success) {
        const formattedErrors: ValidatorErrorsRegister = {
            email: result.error.format().email?._errors[0] ?? null,
            pseudo: result.error.format().pseudo?._errors[0] ?? null,
            password: result.error.format().password?._errors[0] ?? null,
        };
         if (formattedErrors.email == null && formattedErrors.pseudo == null && formattedErrors.password == null){
            return null;
         } else { 
            return formattedErrors
        }
    }

    return null;
};