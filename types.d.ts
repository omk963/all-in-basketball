interface AuthCredentials {
    image: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface Jersey {
    id: string;
    number: string;
    color: string;
    description: string;
    borrowed: boolean;
}

interface JerseyParams {
    number: string;
    color: string;
    description: string;
}

interface BorrowedJerseyParams {
    jerseyId: string;
    userId: string;
}

import "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        image: string;
    }
    interface Session {
        user: User;
    }
    interface JWT {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        image: string;
    }
}