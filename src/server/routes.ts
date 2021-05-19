
import Koa from 'koa';
import KoaRouter from 'koa-router';

export function registerRoutes(app: Koa) {

    const router = new KoaRouter();

    router.get('/', async (ctx) => {
        const welcomeText = 'Welcome to Koa!';
        ctx.body = `<!DOCTYPE html>
<html>
<head>
    <title>${welcomeText}</title>
</head>
<body>
    <h1>${welcomeText}</h1>
</body>
</html>`;
    });

    app.use(router.routes());
    app.use(router.allowedMethods());

}
