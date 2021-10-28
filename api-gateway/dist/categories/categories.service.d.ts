import { Category } from './interfaces/category.interface';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { PlayersService } from 'src/players/players.service';
export declare class CategoriesService {
    private readonly categoryModel;
    private readonly playersService;
    constructor(categoryModel: Model<Category>, playersService: PlayersService);
    private logger;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
    consultAllCategories(): Promise<Array<Category>>;
    consultCategoryById(category: string): Promise<Category>;
    consultCategoryOfPlayer(idPlayer: any): Promise<Category>;
    updateCategory(category: string, updateCategoryDto: UpdateCategoryDto): Promise<void>;
    addCategoryToPlayer(params: string[]): Promise<void>;
}
