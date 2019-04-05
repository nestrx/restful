import { ArgumentMetadata, Inject, Injectable, PipeTransform, Scope } from "@nestjs/common";
import { isNil } from "@nestjs/common/utils/shared.utils";
import { classToPlain, ClassTransformOptions, plainToClass } from "class-transformer";
import { REQUEST } from "@nestjs/core";

@Injectable({
  scope: Scope.REQUEST
})
export class PipeDto implements PipeTransform {
  options: ClassTransformOptions = {};

  constructor(@Inject(REQUEST) private readonly req?: any) {
    if (req && req.user) {
      this.options.groups = [req.user.role];
    }
  }

  transform(value, metadata: ArgumentMetadata) {
    const { metatype, type } = metadata;
    if (["body", "query"].indexOf(type) !== -1) {
      let plain = classToPlain(plainToClass(metatype, this.toEmptyIfNil(value), this.options));
      return this.removeEmpty(plain);
    }
    return value;
  }

  toEmptyIfNil<T = any, R = any>(value: T): R | {} {
    return isNil(value) ? {} : value;
  }

  removeEmpty(obj) {
    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === "object") {
        this.removeEmpty(obj[key]);
      } else if (obj[key] === null || obj[key] === "") {
        delete obj[key];
      }
    });
    return obj;
  };
}
