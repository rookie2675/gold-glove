# Gym Back-Office

A simple back-office web application for managing customers and employees of a boxing & kickboxing gym.  
Built with Next.js, Prisma, and NextAuth.js, styled with plain CSS.

## Features

- Secure login for gym owner with credentials-based authentication (NextAuth.js)
- Manage Customers and Employees with separate tables
- Track customers' last payment date and employee roles
- Responsive, clean UI with TanStack Table for sorting and pagination
- Hosted on Vercel for easy deployment

## Tech Stack

- Next.js (App Router)
- NextAuth.js (Authentication)
- Prisma ORM with SQLite (Database)
- TanStack Table (Tables)
- Plain CSS for styling
- Vercel (Hosting)

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/gym-backoffice.git
    cd gym-backoffice
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn
    ```

## Environment Variables

The app requires the following environment variables to be set in `.env.local`:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_USERNAME="owner_username"
NEXTAUTH_PASSWORD="owner_password"
```

### How to generate `NEXTAUTH_SECRET`

You can generate a secure secret by running this command in your terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as the value for `NEXTAUTH_SECRET`.

4. Run database migrations:

    ```bash
    npx prisma migrate dev --name init
    ```

5. Start the development server:

    ```bash
    npm run dev
    ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The app is set up to deploy easily on [Vercel](https://vercel.com/). Connect your GitHub repo and set the environment variables in the Vercel dashboard.

## Folder Structure

```
/app           - Next.js app directory with pages and layouts
/prisma        - Prisma schema and migrations
/public        - Static assets like logo and favicon
```

## Future Improvements

- Add filtering and search for tables
- Implement mobile-friendly responsive design
- Add export functionality (CSV, PDF)
- Improve accessibility compliance
