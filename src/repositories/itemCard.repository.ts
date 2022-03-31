import { EntityRepository, Repository } from "typeorm"
import ItemCard from "../entities/ItemCard"

@EntityRepository(ItemCard)
export default class ItemCardRepository extends Repository<ItemCard>{}