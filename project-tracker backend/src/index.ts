import * as express from 'express';
import {Application} from 'express';
import * as createMiddleware from 'swagger-express-middleware';
import {SwaggerMiddleware} from 'swagger-express-middleware';
import {authentication} from './lib/authentication';
import {router} from './app/routers';


const app: Application = express();
app.use(express.json());

createMiddleware('config/swagger.json', app, (err, middleware: SwaggerMiddleware) => {
    if (err) {
        console.error(err);
    }

    app.use(
        middleware.metadata(),
        middleware.CORS(),
        middleware.parseRequest(),
        middleware.validateRequest()
    );

    const {PORT = 3000} = process.env;

    app.use(authentication)
    app.use(router);

    app.listen(PORT, () => {
        console.log(`server started at http://localhost:${PORT}`);
    });
});
