import { isString } from "util";

import { IsEmail, IsString } from "class-validator";

export class AlertDto{

    @IsString()
    message: string;

}