import { User } from "@/model/user-model";

export async function createUser(user) {
  try {
    await User.create(user);
  } catch (e) {
    throw new Error(e);
  }
}

export async function deleteGeneration(user) {
  try {
    // Находим пользователя в базе данных по идентификатору
    const foundUser = await User.findById(user._id);

    if (!foundUser) {
      throw new Error("User not found");
    }

    // Проверяем, есть ли у пользователя генерации
    if (foundUser.generations > 0) {
      // Уменьшаем количество генераций на 1
      foundUser.generations -= 1;

      // Сохраняем изменения
      await foundUser.save();
    } else {
      throw new Error("No generations left to delete");
    }
  } catch (e) {
    throw new Error(e.message || e);
  }
}
