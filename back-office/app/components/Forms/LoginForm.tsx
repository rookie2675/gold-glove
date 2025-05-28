'use client';

import styles from './LoginForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../schemas/login-form-schema';
import ErrorIcon from '../Icons/ErrorIcon';
import { LoginFormFields } from '../../types/login-form-fields';
import { login } from '@/app/services/authentication-service';
import { toast } from 'sonner';

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues,
    } = useForm<LoginFormFields>({
        resolver: yupResolver(loginSchema),
        mode: 'onBlur',
    });

    async function submitForm() {
        try {
            const values = getValues();
            const success = await login(values);

            if (success) {
                toast.success('Login realizado com sucesso!');
                window.location.href = '/customers';
            } else {
                toast.error('Email ou senha incorretos. Tente novamente.');
            }
        } catch (error) {
            toast.error('Erro ao fazer login. Tente novamente mais tarde.');
            console.error('Login error:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit(submitForm)} className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <div className={styles.inputContainer}>
                    <input
                        type="email"
                        id="email"
                        placeholder="Digite o seu email"
                        className={styles.input}
                        {...register('email')}
                        style={{ color: errors.email ? 'var(--error)' : '' }}
                    />
                    {errors.email && <ErrorIcon message={errors.email.message as string} />}
                </div>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="password">Senha</label>
                <div className={styles.inputContainer}>
                    <input
                        type="password"
                        id="password"
                        placeholder="Digite a sua senha"
                        className={styles.input}
                        {...register('password')}
                        style={{ color: errors.password ? 'var(--error)' : '' }}
                    />
                    {errors.password && <ErrorIcon message={errors.password.message as string} />}
                </div>
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'ENTRANDO...' : 'LOGIN'}
            </button>
        </form>
    );
}
