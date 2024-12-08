import { BadRequestException } from "@nestjs/common";
import { Request } from "express";
import { mkdirSync } from "fs";
import { extname, join } from "path";
import { BadRequestErrorEnum } from "src/constants/messages";
import { MulterCallBackDestination, MulterCallBackFileName, MulterFileType } from "src/constants/types";
import { validImageExts } from "src/constants/valid_values";

export function MulterImageDestination(foldername: string) {
    return function(req: Request, file: MulterFileType, cb: MulterCallBackDestination): void {
        const path = join("public", "uploads", foldername)
        mkdirSync(path, { recursive: true })
        cb(null, path)
    }
}

export function MulterImageFileName(req: Request, file: MulterFileType, cb: MulterCallBackFileName): void {
    const ext = extname(file.originalname).toLowerCase();
    if(!validImageExts.includes(ext)) {
        cb(new BadRequestException(BadRequestErrorEnum.ImageFormatIsNotValid), null);
    }
    const name = `${Date.now()}${ext}`
    cb(null, name)
}