import { ObjectType, Field, ID, Float } from "type-graphql"

@ObjectType()
export class Item {
  @Field(() => ID)
  id!: string

  @Field()
  name!: string

  @Field(() => Float)
  price!: number

  @Field()
  stock!: number
}
