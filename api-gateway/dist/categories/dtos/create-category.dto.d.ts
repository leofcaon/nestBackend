import { Event } from "../interfaces/category.interface";
export declare class CreateCategoryDto {
    readonly category: string;
    description: string;
    events: Array<Event>;
}
