import { Injectable, BadRequestException, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './interfaces/category.interface';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto'
import { PlayersService } from 'src/players/players.service';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectModel('Category') private readonly categoryModel: Model<Category>,
        private readonly playersService: PlayersService) {}

        private logger = new Logger(CategoriesService.name);

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {

        const { category } = createCategoryDto

        const categoryFounded = await this.categoryModel.findOne({category}).exec();

        if (categoryFounded) {
            throw new BadRequestException(`Category ${category} já cadastrada!`)
        }

        const categoryCreated = new this.categoryModel(createCategoryDto)
        return await categoryCreated.save()

    }

    async consultAllCategories(): Promise<Array<Category>> {
        return await this.categoryModel.find().populate("players").exec()
    }

    async consultCategoryById(category: string): Promise<Category> {

        const categoryFounded = await this.categoryModel.findOne({category}).exec()

        if(!categoryFounded) {
            throw new NotFoundException(`Categoria ${category} não encontrada!`)
        }

        return categoryFounded

    }

    async consultCategoryOfPlayer(idPlayer: any): Promise<Category> {

       const players = await this.playersService.consultAllPlayers()

       const playerFilter = players.filter( player => player._id == idPlayer )

       if (playerFilter.length == 0) {
           throw new BadRequestException(`O id ${idPlayer} não é um jogador!`)
       }

        return await this.categoryModel.findOne().where('players').in(idPlayer).exec() 

    }

    async updateCategory(category: string, updateCategoryDto: UpdateCategoryDto): Promise<void> {
   
        const categoryFounded = await this.categoryModel.findOne({category}).exec()

        if (!categoryFounded) {
            throw new NotFoundException(`Categoria ${category} não encontrada!`)
        }

        await this.categoryModel.findOneAndUpdate({category},{$set: updateCategoryDto}).exec()
        
    }

    async addCategoryToPlayer(params: string[]): Promise<void> {

        const category = params['category']
        const idPlayer = params['idPlayer']

        const categoryFounded = await this.categoryModel.findOne({category}).exec()
        const playerRegisteredCategory = 
                                await this.categoryModel
                                                    .findOne()
                                                    .where('players')
                                                    .in(idPlayer)
                                                    .exec() 

        const players = await this.playersService.consultAllPlayers()

        const playerFilter = players.filter( player => player._id == idPlayer )

        if (playerFilter.length == 0) {
            throw new BadRequestException(`O id ${idPlayer} não é um jogador!`)
        }
        
        if (!categoryFounded) {
            throw new BadRequestException(`Categoria ${category} não cadastrada!`)
        }

        if(playerRegisteredCategory) {
            throw new BadRequestException(`Jogador ${idPlayer} já cadastrado na Categoria ${playerRegisteredCategory.category}!`)
        }

        categoryFounded.players.push(idPlayer)
        await this.categoryModel.findOneAndUpdate({category},{$set: categoryFounded}).exec() 
    }

}
