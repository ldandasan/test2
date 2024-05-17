import { AppDataSource } from "./data-source"
import { users } from "./entity/User"

export const Bootstrap = async () => {
    const userRepo = AppDataSource.getRepository(users);
    const user = userRepo.create({
      name: "Alex",
      email: "Brooks"
    });
    await userRepo.save(user).catch((err) => {
      console.log("Error: ", err);
    });
    console.log("New User Saved", user);
  };
