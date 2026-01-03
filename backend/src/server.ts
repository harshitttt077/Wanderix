import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'Wanderix API is running' });
});

// API Routes
import destinationRoutes from './routes/destinationRoutes.js';

app.use('/api/destinations', destinationRoutes);

app.get('/api', (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to Wanderix API',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            users: '/api/users',
            destinations: '/api/destinations',
        }
    });
});

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: Error, req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
    console.log(`🌐 API endpoint: http://localhost:${PORT}/api`);
});

export default app;
