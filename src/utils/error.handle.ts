import { Response } from "express";
const handleHttp = (res: Response, error: string) => {
    res.status(500);
    res.send({ error });
};

const isObjectEmpty = (objectName: any): boolean => {
    return (
      objectName &&
      Object.keys(objectName).length === 0 &&
      objectName.constructor === Object
    );
};
export { handleHttp, isObjectEmpty };