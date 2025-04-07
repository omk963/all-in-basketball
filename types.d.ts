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

interface Player {
    id: string;
    userId: string; // This is the id of the user in the users table
    captain: boolean; // Indicates if the player is a captain
    yearsOfExperience: number; // Years of experience the player has
    positions?: string[]; // Array of position ids the player can play (optional)
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