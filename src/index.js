const express = require('express');
const dockerTag = process.env.APP_VERSION;
const isCanary = Number(process.env.IS_CANARY || 0) === 1;

console.log('app started with docker tag ' + dockerTag);
if (isCanary) {
    console.log('app is canary deployment');
} else {
    console.log('app is normal deployment');
}

const app = express();
app.get('/', (_, res) => {
    let message = '';
    if (isCanary) {
        message += 'CANARY ';
    }
    message += 'Hi! I\'m using docker tag ' + dockerTag + '\n';
    res.send(message);
});

const server = app.listen(3000, () => {
    console.log('server started');
});

const shutdown = (signal) => {
    console.log('received shutdown signal ' + signal);
    server.close((err) => {
        if (err) {
            console.error('error while shutting down server', err);
            process.exit(1);
        } else {
            console.log('successfully shut down server');
            process.exit(0);
        }
    });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
