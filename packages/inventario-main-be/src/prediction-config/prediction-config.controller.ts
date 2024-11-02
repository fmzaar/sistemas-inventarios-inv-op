import { Controller, Post, Get, Body, Param, Patch, Delete, BadRequestException, Put } from '@nestjs/common';
import { PredictionConfigService } from './prediction-config.service';
import { CreatePredictionConfigDto } from './dto/create-prediction-config.dto';
import { UpdateDemandDto } from 'src/demand/dto/update-demand.dto';
import { UpdatePredictionConfigDto } from './dto/update-prediction-config.dto';

@Controller('prediction-config')
export class PredictionConfigController {


  constructor(private readonly configService: PredictionConfigService) {}

  @Post()
  async createConfig(@Body() createConfigDto: CreatePredictionConfigDto) {
    try {return this.configService.createConfig(createConfigDto);
    }catch (error){
        console.error(error);
        throw new BadRequestException(error.message)
      }
    }

  

  @Get()
  async findAll() {
    return this.configService.findAll();
  }

  @Get(':id')
    findOne(@Param('id') id: number) {
        return this.configService.findOne(id);
    }

    @Put('/:id')
    update(@Param('id') id: number, @Body() UpdatePredictionConfigDto: UpdatePredictionConfigDto) {
      
      try{
        return this.configService.update(id, UpdatePredictionConfigDto);
      }catch(error){
        throw new BadRequestException(error.message)
      }
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.configService.remove(id);

    }
}

    
    