import { UserSequelizeModel } from '../database/models/user.model';
import { ProductIds, User } from '../types/User';

const mapProductIds = (allUsers: UserSequelizeModel[]): User[] => {
  const usersData: User[] = allUsers.map((user) => {
    const userData: User = user.get({ plain: true });
    userData.productIds = user.dataValues.productIds?.map((product: ProductIds) => {
      if (typeof product === 'object') return product.id;
      return product;
    });
  
    return userData;
  });
  return usersData;
};

export default mapProductIds;