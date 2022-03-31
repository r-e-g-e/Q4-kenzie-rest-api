import { EntityRepository, Repository } from "typeorm"
import Cart from "../entities/Cart"

@EntityRepository(Cart)
export default class CartRepository extends Repository<Cart>{}