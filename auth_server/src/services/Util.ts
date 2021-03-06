import * as bcrypt from "bcrypt";

// Modified Version of http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
export function to(promise: Promise<any>) {
  return promise
    .then((data) => {
      return [null, data];
    })
    .catch((err: Error) => [err.message, null]);
}

// Error Web Response
export async function resOnError(res: any, err: any, code: any) {
  res.statusCode = code;
  return res.json({ success: false, error: err });
}

// Success Web Response
export async function resOnSuccess(res: any, data: any, code: any) {
  let sendData = { success: true };
  sendData = { ...data, ...sendData }; // merge the objects
  res.statusCode = code;
  return res.json(sendData);
}

// Error throwing wrapper
export function throwError(errmessage: any, log: any = false) {
  if (log === true) {
    console.error(errmessage);
  }

  throw new Error(errmessage);
}

// Password Hashing
export async function hashPassword(password: string, saltRounds: number = 10) {
  return bcrypt.hash(password, saltRounds);
}
