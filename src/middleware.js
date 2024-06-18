import { NextResponse } from 'next/server';

const isProduction = process.env.NODE_ENV === 'production';

let middleware;

if (isProduction) {
    // If you want to use Clerk in production, uncomment the lines below
    // const { clerkMiddleware } = require("@clerk/nextjs/server");
    // middleware = clerkMiddleware();

    // For now, we use the same mock middleware for both environments
    middleware = async (req, ev) => {
        // Mock user data or add custom logic here
        req.auth = {
            userId: 'mock-user-id',
            sessionId: 'mock-session-id',
            getToken: async () => 'mock-token'
        };
        return NextResponse.next();
    };
} else {
    // Mock middleware for local development
    middleware = async (req, ev) => {
        // Mock user data or add custom logic here
        req.auth = {
            userId: 'mock-user-id',
            sessionId: 'mock-session-id',
            getToken: async () => 'mock-token'
        };
        return NextResponse.next();
    };
}

export default middleware;

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
