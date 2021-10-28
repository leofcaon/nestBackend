export declare class UpdateCategoryDto {
    description: string;
    events: Array<Event>;
}
interface Event {
    name: string;
    operation: string;
    value: number;
}
export {};
