import { Controller, Get, Post, Put, Delete, Res, HttpStatus, 
    Body, Param, NotFoundException, Query } from '@nestjs/common';
import { ProductDto } from "./dto/product.dto";
import { ProductService } from './product.service'; 
import { get } from 'mongoose';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){}

    @Get(`/`)
    async allProducts(@Res() res){
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json({
            products
        });
    }

    @Get(`/:id`)
    async Product(@Res() res, @Param(`id`) id){
        if (!id.match(/^[0-9a-fA-F]{24}$/)) throw new NotFoundException(`Product does not exist`);
        const product = await this.productService.getProduct(id);
        if(!product) throw new NotFoundException(`Product does not exist`);
        return res.status(HttpStatus.OK).json(product);
    }

    @Post('/create')
    async createPost(@Res() res, @Body() productDto: ProductDto){
        const product = await this.productService.createProduct(productDto);
        return res.status(HttpStatus.OK).json({
            message: 'Product successfully created',
            product: product
        });
    }

    @Delete(`/delete`)
    async deleteProduct(@Res() res, @Query(`productId`) id){
        const product = await this.productService.deleteProduct(id);
        if(!product) throw new NotFoundException(`Product does not exist`);        
        return res.status(HttpStatus.OK).json({
            message: 'Product delete successfully',
            product: product
        })
    }

    @Put(`/update/:id`)
    async updateProduct(@Res() res, @Body() productDto: ProductDto, @Param(`id`) id) {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) throw new NotFoundException(`Product does not exist`);
        const product = await this.productService.updateProduct(id,productDto);
        if(!product) throw new NotFoundException(`Product does not exist`);
        return res.status(HttpStatus.OK).json({
            message: 'Product updated successfully',
            product: product
        });
    }
}
