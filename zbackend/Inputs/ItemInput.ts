import { InputType, Field, Float } from "type-graphql"

@InputType()
export class ItemInput {
  @Field()
  name!: string

  @Field(() => Float)
  price!: number

  @Field()
  stock!: number
}
