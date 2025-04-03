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
    size: string;
    description: string;
}

interface JerseyParams {
    number: string;
    color: string;
    size: string;
    description: string;
}

interface BorrowedJerseyParams {
    playerId: string;
    jerseyId: string;
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