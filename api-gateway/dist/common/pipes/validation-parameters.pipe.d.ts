import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
export declare class ValidationParametersPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
