import { UpdateCategoryDto } from './dtos/update-category.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './interfaces/category.interface';
import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
    consultCategories(params: string[]): Promise<Array<Category> | Category>;
    updateCategory(updateCategoryDto: UpdateCategoryDto, category: string): Promise<void>;
    addCategoryToPlayer(params: string[]): Promise<void>;
}
