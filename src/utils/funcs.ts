import path, { join } from "path";
import * as fs from 'fs';
import { DeepPartial } from "src/constants/types";
import { invalidObjectKey, invalidObjectValue } from "src/constants/valid_values";

// validation of simple object
export function validateObject(object: Object, blackList:string[] = []) {
    // final res
    const valid: DeepPartial<object> = {};
    // validate
    Object.keys(object).map(key => {
        if(!invalidObjectKey.includes(key))
        if(!blackList.includes(key))
        if(!invalidObjectValue.includes(object[key]))
            valid[key] = object[key];
    });
    return valid;
}

export function deleteImage(imagePath: string) {
    const full = join(__dirname, "..", "..", imagePath)
    // Delete the file
    fs.unlinkSync(full);
}