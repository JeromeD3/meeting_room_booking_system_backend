//dto 是封装 body 里的请求参数的
export class RegisterUserDto {
  username: string;

  nickName: string;

  password: string;

  email: string;

  captcha: string; // 验证码
}
