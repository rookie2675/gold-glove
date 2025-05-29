import { Customer } from '@prisma/client';

export class CustomerService {
    private static instance: CustomerService;
    private static readonly BASE_URL: string = '/api/customers';

    private constructor() {}

    public static getInstance(): CustomerService {
        if (!CustomerService.instance) {
            CustomerService.instance = new CustomerService();
        }
        return CustomerService.instance;
    }

    public async createCustomer(data: Customer): Promise<Customer> {
        const response = await fetch(CustomerService.BASE_URL, {
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

    public async updateCustomer(id: string, data: Customer): Promise<Customer> {
        const response = await fetch(`${CustomerService.BASE_URL}/${id}`, {
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

    public async deleteCustomer(id: string): Promise<void> {
        const response = await fetch(`${CustomerService.BASE_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to delete customer');
        }
    }
}
