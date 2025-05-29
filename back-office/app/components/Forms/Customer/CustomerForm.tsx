'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CustomerFormData } from '@/app/types/customer';
import styles from './CustomerForm.module.css';

type CustomerFormProps = {
    customer?: CustomerFormData & { id?: string };
    onSubmit: (data: CustomerFormData) => Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
};

export default function CustomerForm({ customer, onSubmit, onCancel, isLoading = false }: CustomerFormProps) {
    const isEdit = !!customer?.id;
    const [error, setError] = useState<string | null>(null);

    // Define validation schema using yup's type inference
    const customerSchema = yup.object({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Invalid email address').required('Email is required'),
        phone: yup.string().nullable(),
        dateOfBirth: yup
            .string()
            .required('Date of Birth is required')
            .test('is-date', 'Invalid date', (value) => {
                if (!value) return false;
                return !isNaN(Date.parse(value));
            }),
        nif: yup.string().required('NIF is required'),
        lastPaymentDate: yup
            .string()
            .nullable()
            .test('is-date', 'Invalid date', (value) => {
                if (!value) return true; // Allow null/undefined
                return !isNaN(Date.parse(value));
            }),
    });

    // Define form default values
    const defaultValues: CustomerFormData = {
        name: '',
        email: '',
        phone: null,
        dateOfBirth: new Date().toISOString().split('T')[0],
        nif: '',
        lastPaymentDate: null,
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CustomerFormData>({
        resolver: yupResolver(customerSchema as any), // Type assertion to handle yup and react-hook-form types
        defaultValues: customer || defaultValues,
    });

    useEffect(() => {
        if (customer) {
            // Format dates for the date input fields
            const formattedCustomer = {
                ...customer,
                dateOfBirth: customer.dateOfBirth ? new Date(customer.dateOfBirth).toISOString().split('T')[0] : '',
                lastPaymentDate: customer.lastPaymentDate ? new Date(customer.lastPaymentDate).toISOString().split('T')[0] : '',
            };
            reset(formattedCustomer);
        }
    }, [customer, reset]);

    const onSubmitHandler: SubmitHandler<CustomerFormData> = async (data) => {
        try {
            setError(null);
            await onSubmit(data);
        } catch (err) {
            setError('Failed to save customer. Please try again.');
            console.error('Error saving customer:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.formGroup}>
                <label htmlFor="name">Name *</label>
                <input id="name" type="text" {...register('name')} className={errors.name ? styles.errorInput : ''} />
                {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input id="email" type="email" {...register('email')} className={errors.email ? styles.errorInput : ''} />
                {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="tel" {...register('phone')} />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="dateOfBirth">Date of Birth *</label>
                <input
                    id="dateOfBirth"
                    type="date"
                    {...register('dateOfBirth', { required: 'Date of Birth is required' })}
                    className={errors.dateOfBirth ? styles.errorInput : ''}
                />
                {errors.dateOfBirth && <span className={styles.errorMessage}>{errors.dateOfBirth.message}</span>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="nif">NIF *</label>
                <input id="nif" type="text" {...register('nif', { required: 'NIF is required' })} className={errors.nif ? styles.errorInput : ''} />
                {errors.nif && <span className={styles.errorMessage}>{errors.nif.message}</span>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="lastPaymentDate">Last Payment Date</label>
                <input id="lastPaymentDate" type="date" {...register('lastPaymentDate')} />
            </div>

            <div className={styles.buttonGroup}>
                <button type="button" onClick={onCancel} className={`${styles.button} ${styles.cancelButton}`} disabled={isLoading}>
                    Cancel
                </button>
                <button type="submit" className={`${styles.button} ${styles.submitButton}`} disabled={isLoading}>
                    {isLoading ? 'Saving...' : isEdit ? 'Update Customer' : 'Create Customer'}
                </button>
            </div>
        </form>
    );
}
