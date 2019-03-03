let jwtConfig: any = {};

jwtConfig.encryption =
  process.env.JWT_ENCRYPTION ||
  "`#{E)EZVefmnkswfoksegjiergjkskjgsgkjsngksgvnskvnskgvnsknknknknknksngvskvnsvkjsvjlksdjrjrngjrgnjrgnrjgnjR)F*2`d6";
jwtConfig.expiration = process.env.JWT_EXPIRATION || "7200";

export default jwtConfig;
