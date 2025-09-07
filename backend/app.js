const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:8080',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Function to format uptime for better readability
function formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
}

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Hello from Node.js Backend!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        service: 'backend'
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        uptime: formatUptime(process.uptime()), // Formatted uptime
        timestamp: new Date().toISOString(),
        service: 'backend'
    });
});

app.get('/api/hello', (req, res) => {
    res.json({
        message: 'Hello from API endpoint!',
        data: {
            method: req.method,
            url: req.url,
            // To get the real client IP behind a proxy, you might need: req.headers['x-forwarded-for'] || req.socket.remoteAddress
            clientIP: req.ip || req.connection.remoteAddress,
            timestamp: new Date().toISOString()
        },
        service: 'backend'
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:8080'}`);
});