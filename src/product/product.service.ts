import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './interfaces/product.interface';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel(`Product`) private readonly productModel: Model<Product>){
    }

    async getProducts(): Promise<Product[]>{
        const products = await this.productModel.find();
        return products;
    }

    async getProduct(id: string): Promise<Product>{
        const product = await this.productModel.findById(id);
        return product;
    }

    async createProduct(productDto: ProductDto): Promise<Product>{
        const product = new this.productModel(productDto);
        return await product.save();
    }

    async deleteProduct(id: string): Promise<Product>{
        const product = await this.productModel.findByIdAndDelete(id);
        return product;
    }

    async updateProduct(id: string, productDto: ProductDto): Promise<Product>{
        console.log(id);
        
        const product = await this.productModel.findByIdAndUpdate(id, productDto, {new: true});
        return product;
    }
}