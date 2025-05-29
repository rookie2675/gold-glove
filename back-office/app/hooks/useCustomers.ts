// hooks/useCustomers.ts
import { useState, useCallback } from 'react';
import { Customer, CustomerFormData } from '../types/customer';
import { createCustomer, deleteCustomer, updateCustomer } from '../services/customer-service';

export function useCustomers() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);

    const fetchCustomers = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/customers');
            if (!response.ok) {
                throw new Error('Failed to fetch customers');
            }
            const data = await response.json();
            setCustomers(data);
            return data;
        } catch (err) {
            console.error('Error fetching customers:', err);
            setError('Failed to load customers. Please try again later.');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleCreateCustomer = useCallback(
        async (data: CustomerFormData) => {
            try {
                await createCustomer(data);
                await fetchCustomers();
                return true;
            } catch (error: any) {
                console.error('Error creating customer:', error);
                setError(error instanceof Error ? error.message : 'Failed to create customer');
                throw error;
            }
        },
        [fetchCustomers]
    );

    const handleUpdateCustomer = useCallback(
        async (id: string, data: CustomerFormData) => {
            try {
                await updateCustomer(id, data);
                await fetchCustomers();
                return true;
            } catch (error: any) {
                console.error('Error updating customer:', error);
                setError(error instanceof Error ? error.message : 'Failed to update customer');
                throw error;
            }
        },
        [fetchCustomers]
    );

    const handleDeleteCustomer = useCallback(
        async (id: string) => {
            try {
                await deleteCustomer(id);
                await fetchCustomers();
                return true;
            } catch (error: any) {
                console.error('Error deleting customer:', error);
                setError(error instanceof Error ? error.message : 'Failed to delete customer');
                throw error;
            }
        },
        [fetchCustomers]
    );

    return {
        customers,
        currentCustomer,
        isLoading,
        error,
        setCurrentCustomer,
        fetchCustomers,
        createCustomer: handleCreateCustomer,
        updateCustomer: handleUpdateCustomer,
        deleteCustomer: handleDeleteCustomer,
    };
}
