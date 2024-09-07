import { prop, getModelForClass } from '@typegoose/typegoose';

export class Case {
  @prop({ required: true })
  bankName!: string;

  @prop({ required: true })
  propertyName!: string;

  @prop({ required: true })
  city!: string;

  @prop({ required: true })
  borrowerName!: string;

  @prop({ required: true, default: Date.now })
  createdAt!: Date;
}

export const CaseModel = getModelForClass(Case);
