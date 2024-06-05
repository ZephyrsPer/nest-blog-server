// payload.dto.ts

export class JwtPayloadDto {
  username: string;
  nick_name?: string; // 使用?表示这个字段是可选的
  role: number; // 根据你的需求，role字段可能是一个枚举或其他类型
}
