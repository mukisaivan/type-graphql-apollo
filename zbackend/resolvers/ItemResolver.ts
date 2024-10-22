import { Resolver, Query, Mutation, Arg } from "type-graphql"
import { Item } from "../models/Item"
import { ItemInput } from "../Inputs/ItemInput"
import prisma from "../lib/prisma"

@Resolver(Item) // Specify the entity type the resolver is for
export class ItemResolver {
  @Query(() => [Item])
  async items(): Promise<Item[]> {
    // Specify return types explicitly
    return await prisma.item.findMany()
  }

  @Mutation(() => Item)
  async addItem(@Arg("data") data: ItemInput): Promise<Item> {
    return await prisma.item.create({ data })
  }

  @Mutation(() => Item)
  async updateItem(
    @Arg("id") id: string,
    @Arg("data") data: ItemInput
  ): Promise<Item> {
    return await prisma.item.update({ where: { id }, data })
  }

  @Mutation(() => Boolean)
  async deleteItem(@Arg("id") id: string): Promise<boolean> {
    await prisma.item.delete({ where: { id } })
    return true
  }
}
