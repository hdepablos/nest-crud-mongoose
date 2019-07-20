import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body } from '@nestjs/common';
import { CreateProductDto } from "./dto/product.dto"; 

@Controller('product')
export class ProductController {
    @Post('/create')
    createPost(@Res() res, @Body() createProductDto: CreateProductDto){
        console.log(createProductDto);
        return res.status(HttpStatus.OK).json({
            message: 'received'
        })
    }
}
