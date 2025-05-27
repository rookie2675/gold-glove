import styles from './LoginForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../schemas/login-form-schema';
import ErrorIcon from '../Icons/ErrorIcon';
import { LoginFormFields } from '../../types/login-form-fields';

interface Props {
    onSubmit: (data: LoginFormFields) => void;
}

export default function LoginForm(props: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormFields>({
        resolver: yupResolver(loginSchema),
        mode: 'onBlur',
    });

    function submitForm(data: LoginFormFields) {
        props.onSubmit(data);
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
            <button type="submit">LOGIN</button>
        </form>
    );
}
