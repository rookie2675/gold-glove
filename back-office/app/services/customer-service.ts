import { CustomerFormData } from '../types/customer';

export async function createCustomer(data: CustomerFormData) {
    const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create customer');
    }

    return await response.json();
}

export async function updateCustomer(id: string, data: CustomerFormData) {
    const response = await fetch(`/api/customers/${id}`, {
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

    return await response.json();
}

export async function deleteCustomer(id: string) {
    const response = await fetch(`/api/customers/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete customer');
    }
}
