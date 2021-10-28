import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Observable } from 'rxjs';
import { ClientProxySmartRanking } from '../proxyrmq/client-proxy';
export declare class CategoriesController {
    private clientProxySmartRanking;
    private logger;
    constructor(clientProxySmartRanking: ClientProxySmartRanking);
    private clientAdminBackend;
    createCategory(createCategoryDto: CreateCategoryDto): void;
    consultCategories(_id: string): Observable<any>;
    updateCategory(updateCategoryDto: UpdateCategoryDto, _id: string): void;
}
