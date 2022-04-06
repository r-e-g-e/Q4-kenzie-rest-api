import { Request, Response } from "express";
import { createUser, createJWT } from "../services/user.services";

class UserController {
  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({
          error: "Following fields are required: name, email & password.",
        });
    }

    try {
      const user = await createUser({ name, email, password });

      delete user.password;

      return res.status(201).json(user);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  async createJWT(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({
          error: "The following fields are required: email & password.",
        });
    }

    try {
      const token = await createJWT({ email, password });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
}

export default new UserController();
