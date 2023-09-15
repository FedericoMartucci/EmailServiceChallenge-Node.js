import { Router } from "express";
import { readdirSync} from "fs";

const PATH_ROUTER = __dirname;
const router = Router();

const cleanFileName = (fileName: string): any => {
    const file = fileName.split('.').shift();
    return file;
}

readdirSync(PATH_ROUTER).filter((fileName): void => {
    const cleanName = cleanFileName(fileName);
    if (cleanName !== 'index'){
        import(`./${cleanName}`).then((routerModule): void => {
            router.use(`/${cleanName}`, routerModule.router);
        });
    }
});

export { router };