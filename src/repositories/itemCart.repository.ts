import { EntityRepository, Repository } from "typeorm"
import ItemCart from "../entities/ItemCart"

@EntityRepository(ItemCart)
export default class ItemCartRepository extends Repository<ItemCart>{}