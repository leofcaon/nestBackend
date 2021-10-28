export declare class CreateCategoryDto {
    readonly category: string;
    description: string;
    events: Array<Event>;
}
interface Event {
    name: string;
    operation: string;
    value: number;
}
export {};
