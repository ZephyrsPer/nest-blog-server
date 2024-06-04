export class UserDto {
  id?: number; // 可选，因为通常在创建新用户时不会传入ID

  username: string; // 必需

  password: string; // 必需，但在实际场景中，密码可能会以更安全的方式处理（如哈希）

  role?: number; // 可选，因为可能只在更新用户时设置角色

  nick_name?: string; // 可选

  avatar?: string; // 可选

  qq?: string; // 可选

  // 注意：通常不会在DTO中包含像ip这样的字段，因为它通常与特定的会话或请求相关
  // 如果需要处理与IP相关的逻辑，它应该在服务层或控制器层处理

  // DTO中通常不包含创建和更新时间戳的字段，因为这些通常由系统自动处理
  // createdAt?: Date;
  // updatedAt?: Date;
}
