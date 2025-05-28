'use client';

import { useState, useEffect } from 'react';
import { Customer, CustomerFormData } from '../types/customer';
import CustomerForm from '../../src/components/customers/CustomerForm';
import Modal from '../../src/components/ui/Modal';
import styles from './page.module.css';
import CustomersTable from '../components/Tables/CustomersTable';
import { createCustomer, deleteCustomer, updateCustomer } from '../services/customer-service';

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetch customers from the API
    const fetchCustomers = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/customers');
            if (!response.ok) {
                throw new Error('Failed to fetch customers');
            }
            const data = await response.json();
            setCustomers(data);
        } catch (err) {
            console.error('Error fetching customers:', err);
            setError('Failed to load customers. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    // Load customers on component mount
    useEffect(() => {
        fetchCustomers();
    }, []);

    async function handleCreateCustomer(data: CustomerFormData) {
        try {
            await createCustomer(data);
            setIsModalOpen(false);
            await fetchCustomers();
            setCurrentCustomer(null);
        } catch (error: any) {
            console.error('Error creating customer:', error);
            setError(error instanceof Error ? error.message : 'Failed to create customer');
        }
    }

    async function handleDeleteCustomer(customer: Customer) {
        try {
            await deleteCustomer(customer.id);
            await fetchCustomers();
        } catch (error: any) {
            console.error('Error deleting customer:', error);
            throw error;
        }
    }

    async function handleUpdateCustomer(data: CustomerFormData) {
        if (!currentCustomer?.id) return;

        try {
            await updateCustomer(currentCustomer.id, data);
            await fetchCustomers();
            setIsModalOpen(false);
            setCurrentCustomer(null);
        } catch (error: any) {
            console.error('Error updating customer:', error);
            setError(error instanceof Error ? error.message : 'Failed to update customer');
        }
    }

    const handleSubmit = async (data: CustomerFormData) => {
        if (currentCustomer?.id) {
            await handleUpdateCustomer(data);
        } else {
            await handleCreateCustomer(data);
        }
    };

    // Handle editing a customer
    const handleEditCustomer = (customer: Customer) => {
        setCurrentCustomer(customer);
        setIsModalOpen(true);
    };

    // Close the modal and reset form
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentCustomer(null);
        setError(null);
    };

    return (
        <div className={styles.container}>
            {error && <div className={styles.error}>{error}</div>}

            <CustomersTable
                data={customers}
                onEdit={handleEditCustomer}
                onDelete={handleDeleteCustomer}
                onAddNew={() => {
                    setCurrentCustomer(null);
                    setIsModalOpen(true);
                }}
                isLoading={isLoading}
            />

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={currentCustomer ? 'Edit Customer' : 'New Customer'}>
                <CustomerForm customer={currentCustomer || undefined} onSubmit={handleSubmit} onCancel={handleCloseModal} isLoading={false} />
            </Modal>
        </div>
    );
}
