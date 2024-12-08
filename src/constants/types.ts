// multer types
export type MulterFileType = Express.Multer.File;
export type MulterCallBackDestination = (error: Error, destination: string) => void;
export type MulterCallBackFileName = (error: Error, destination: string) => void;
// optional property of keys in object
export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
};