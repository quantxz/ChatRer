import { userDto } from "./User.dto";

export interface roomsDto{
    name: string,
    visits?: number,
    userName?: userDto["name"]
}