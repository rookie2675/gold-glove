import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await seedCustomers();
    await seedEmployees();
    console.log('Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

async function seedCustomers() {
    const customers = [
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+351 912345678',
            dateOfBirth: new Date('1990-01-01'),
            nif: '123456789',
            lastPaymentDate: new Date('2025-05-01'),
        },
        {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+351 987654321',
            dateOfBirth: new Date('1985-02-15'),
            nif: '987654321',
            lastPaymentDate: new Date('2025-04-15'),
        },
        {
            name: 'Robert Johnson',
            email: 'robert.johnson@example.com',
            phone: '+351 913456789',
            dateOfBirth: new Date('1988-03-22'),
            nif: '123456782',
            lastPaymentDate: new Date('2025-05-05'),
        },
        {
            name: 'Sarah Williams',
            email: 'sarah.williams@example.com',
            phone: '+351 924567890',
            dateOfBirth: new Date('1983-04-30'),
            nif: '234567891',
            lastPaymentDate: new Date('2025-04-20'),
        },
        {
            name: 'Michael Brown',
            email: 'michael.brown@example.com',
            phone: '+351 935678901',
            dateOfBirth: new Date('1992-05-18'),
            nif: '345678902',
            lastPaymentDate: new Date('2025-05-10'),
        },
        {
            name: 'Emily Davis',
            email: 'emily.davis@example.com',
            phone: '+351 946789012',
            dateOfBirth: new Date('1987-06-25'),
            nif: '456789013',
            lastPaymentDate: new Date('2025-04-25'),
        },
        {
            name: 'David Wilson',
            email: 'david.wilson@example.com',
            phone: '+351 957890123',
            dateOfBirth: new Date('1990-07-30'),
            nif: '567890124',
            lastPaymentDate: new Date('2025-05-15'),
        },
        {
            name: 'Sophie Taylor',
            email: 'sophie.taylor@example.com',
            phone: '+351 968901234',
            dateOfBirth: new Date('1984-08-12'),
            nif: '678901235',
            lastPaymentDate: new Date('2025-04-30'),
        },
        {
            name: 'James Anderson',
            email: 'james.anderson@example.com',
            phone: '+351 979012345',
            dateOfBirth: new Date('1989-09-28'),
            nif: '789012346',
            lastPaymentDate: new Date('2025-05-20'),
        },
        {
            name: 'Olivia Martinez',
            email: 'olivia.martinez@example.com',
            phone: '+351 980123456',
            dateOfBirth: new Date('1986-10-15'),
            nif: '890123457',
            lastPaymentDate: new Date('2025-04-18'),
        },
        {
            name: 'William Garcia',
            email: 'william.garcia@example.com',
            phone: '+351 991234567',
            dateOfBirth: new Date('1991-11-03'),
            nif: '901234568',
            lastPaymentDate: new Date('2025-05-08'),
        },
        {
            name: 'Emma Rodriguez',
            email: 'emma.rodriguez@example.com',
            phone: '+351 902345678',
            dateOfBirth: new Date('1982-12-20'),
            nif: '012345679',
            lastPaymentDate: new Date('2025-04-28'),
        },
        {
            name: 'Daniel Hernandez',
            email: 'daniel.hernandez@example.com',
            phone: '+351 913456780',
            dateOfBirth: new Date('1987-01-10'),
            nif: '123456780',
            lastPaymentDate: new Date('2025-05-12'),
        },
        {
            name: 'Sophia Lopez',
            email: 'sophia.lopez@example.com',
            phone: '+351 924567891',
            dateOfBirth: new Date('1985-02-25'),
            nif: '234567892',
            lastPaymentDate: new Date('2025-04-22'),
        },
        {
            name: 'Matthew Wilson',
            email: 'matthew.wilson@example.com',
            phone: '+351 935678902',
            dateOfBirth: new Date('1990-03-15'),
            nif: '345678903',
            lastPaymentDate: new Date('2025-05-18'),
        },
        {
            name: 'Ava Martinez',
            email: 'ava.martinez@example.com',
            phone: '+351 946789013',
            dateOfBirth: new Date('1988-04-30'),
            nif: '456789014',
            lastPaymentDate: new Date('2025-04-27'),
        },
        {
            name: 'Joseph Brown',
            email: 'joseph.brown@example.com',
            phone: '+351 957890124',
            dateOfBirth: new Date('1983-05-20'),
            nif: '567890125',
            lastPaymentDate: new Date('2025-05-22'),
        },
        {
            name: 'Grace Taylor',
            email: 'grace.taylor@example.com',
            phone: '+351 968901235',
            dateOfBirth: new Date('1986-06-12'),
            nif: '678901236',
            lastPaymentDate: new Date('2025-04-30'),
        },
        {
            name: 'Thomas Anderson',
            email: 'thomas.anderson@example.com',
            phone: '+351 979012346',
            dateOfBirth: new Date('1991-07-25'),
            nif: '789012347',
            lastPaymentDate: new Date('2025-05-25'),
        },
        {
            name: 'Isabella Garcia',
            email: 'isabella.garcia@example.com',
            phone: '+351 980123457',
            dateOfBirth: new Date('1984-08-30'),
            nif: '890123458',
            lastPaymentDate: new Date('2025-04-20'),
        },
        {
            name: 'Charles Rodriguez',
            email: 'charles.rodriguez@example.com',
            phone: '+351 991234568',
            dateOfBirth: new Date('1989-09-15'),
            nif: '901234569',
            lastPaymentDate: new Date('2025-05-10'),
        },
        {
            name: 'Mia Hernandez',
            email: 'mia.hernandez@example.com',
            phone: '+351 902345679',
            dateOfBirth: new Date('1987-10-28'),
            nif: '012345670',
            lastPaymentDate: new Date('2025-04-25'),
        },
        {
            name: 'Andrew Lopez',
            email: 'andrew.lopez@example.com',
            phone: '+351 913456781',
            dateOfBirth: new Date('1992-11-18'),
            nif: '123456781',
            lastPaymentDate: new Date('2025-05-15'),
        },
    ];

    await prisma.customer.createMany({
        data: customers,
    });

    console.log('Customers seeded successfully!');
}

async function seedEmployees() {
    const employees = [
        {
            name: 'Mike Tyson',
            email: 'mike.tyson@goldglove.pt',
            phone: '+351 910000000',
            dateOfBirth: new Date('1966-06-30'),
            nif: '111111111',
        },
        {
            name: 'Sarah Johnson',
            email: 'sarah.johnson@goldglove.pt',
            phone: '+351 920000000',
            dateOfBirth: new Date('1988-03-25'),
            nif: '222222222',
        },
        {
            name: 'David Silva',
            email: 'david.silva@goldglove.pt',
            phone: '+351 930000000',
            dateOfBirth: new Date('1975-04-10'),
            nif: '333333333',
        },
    ];

    await prisma.employee.createMany({
        data: employees,
    });

    console.log('Employees seeded successfully!');
}
