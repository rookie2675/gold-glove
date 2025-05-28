'use client';

import { useState, useEffect } from 'react';
import { Customer, CustomerFormData } from '../types/customer';
import CustomerForm from '../../src/components/customers/CustomerForm';
import Modal from '../../src/components/ui/Modal';
import styles from './page.module.css';
import CustomersTable from '../components/Tables/CustomersTable';
import { createCustomer } from '../services/customer-service';

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
        } catch (error) {
            console.error('Error creating customer:', error);
            setError(error instanceof Error ? error.message : 'Failed to create customer');
        }
    }

    // Handle updating an existing customer
    const handleUpdateCustomer = async (data: CustomerFormData) => {
        if (!currentCustomer?.id) return;

        try {
            const response = await fetch(`/api/customers/${currentCustomer.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update customer');
            }

            // Refresh the customers list
            await fetchCustomers();
            setIsModalOpen(false);
            setCurrentCustomer(null);
        } catch (err) {
            console.error('Error updating customer:', err);
            setError(err instanceof Error ? err.message : 'Failed to update customer');
        }
    };

    // Handle form submission (create or update)
    const handleSubmit = async (data: CustomerFormData) => {
        if (currentCustomer?.id) {
            await handleUpdateCustomer(data);
        } else {
            await handleCreateCustomer(data);
        }
    };

    // Handle deleting a customer
    const handleDeleteCustomer = async (customer: Customer) => {
        try {
            const response = await fetch(`/api/customers/${customer.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete customer');
            }

            // Refresh the customers list
            await fetchCustomers();
        } catch (err) {
            console.error('Error deleting customer:', err);
            throw err; // This will be caught by the error boundary in the table
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
