import { CreateCategoryDto } from './dtos/create-category.dto';
export declare class AppController {
    private logger;
    private clientAdminBackend;
    constructor();
    createCategory(createCategoryDto: CreateCategoryDto): Promise<import("rxjs").Observable<any>>;
}
