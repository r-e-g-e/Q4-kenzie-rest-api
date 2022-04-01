import { EntityRepository, Repository } from "typeorm"
import ItemCard from "../entities/ItemCart"

@EntityRepository(ItemCard)
export default class ItemCartRepository extends Repository<ItemCard>{}