import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Controller, Body, Post, UsePipes, ValidationPipe, Get, Param, Put, Query } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './interfaces/category.interface';
import { CategoriesService } from './categories.service';

@Controller('api/v1/categories')
export class CategoriesController {

    constructor(private readonly categoriesService: CategoriesService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createCategory(
        @Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoriesService.createCategory(createCategoryDto)
    }

    @Get()
    async consultCategories(
        @Query() params: string[]): Promise<Array<Category> | Category> {
        const idCategory = params['idCategory']
        const idPlayer = params['idPlayer']

        if (idCategory) {
            return await this.categoriesService.consultCategoryById(idCategory)
        }

        if (idPlayer) {
            return await this.categoriesService.consultCategoryOfPlayer(idPlayer)
        }

        return await this.categoriesService.consultAllCategories()

    }

    @Put('/:category')
    @UsePipes(ValidationPipe)
    async updateCategory(
        @Body() updateCategoryDto: UpdateCategoryDto,
        @Param('category') category: string): Promise<void> {
        await this.categoriesService.updateCategory(category, updateCategoryDto)

    }

    @Post('/:category/players/:idPlayer')
    async addCategoryToPlayer(
        @Param() params: string[]): Promise<void> {
        return await this.categoriesService.addCategoryToPlayer(params)

    }

}
