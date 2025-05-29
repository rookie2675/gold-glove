'use client';

import { useEffect, useState } from 'react';
import { useCustomers } from '../hooks/useCustomers';
import CustomerForm from '../components/Forms/Customer/CustomerForm';
import Modal from '../../src/components/ui/Modal';
import styles from './page.module.css';
import CustomersTable from '../components/Tables/CustomersTable';
import { CustomerFormData } from '../types/customer';

export default function CustomersPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { customers, currentCustomer, isLoading, error, setCurrentCustomer, fetchCustomers, createCustomer, updateCustomer, deleteCustomer } = useCustomers();

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    const handleSubmit = async (data: CustomerFormData) => {
        try {
            if (currentCustomer?.id) {
                await updateCustomer(currentCustomer.id, data);
            } else {
                await createCustomer(data);
            }
            setIsModalOpen(false);
            setCurrentCustomer(null);
        } catch (error) {
            // Error is already handled in the hook
        }
    };

    const handleEditCustomer = (customer: Customer) => {
        setCurrentCustomer(customer);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentCustomer(null);
    };

    return (
        <div className={styles.container}>
            {error && <div className={styles.error}>{error}</div>}

            <CustomersTable
                data={customers}
                onEdit={handleEditCustomer}
                onDelete={deleteCustomer}
                onAddNew={() => {
                    setCurrentCustomer(null);
                    setIsModalOpen(true);
                }}
                isLoading={isLoading}
            />

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={currentCustomer ? 'Edit Customer' : 'New Customer'}>
                <CustomerForm customer={currentCustomer || undefined} onSubmit={handleSubmit} onCancel={handleCloseModal} isLoading={isLoading} />
            </Modal>
        </div>
    );
}
