import { TypeCompiler } from "@sinclair/typebox/compiler"
import {
  // Env
  Env,

  // Util
  IsDecryptedV4Obj,
  IsEmail,
  IsNumber,
  IsObject,
  IsString,
  IsNanoId,

  // Backend Input
  BiUserPADeleteAccount,
  BiUserPASignOutFromAll,
  BiUserPASignOutFromOne,
  BiUserPAUpdateName,
  BiUserPAUpdatePassword,
  BiUserPLDashTop,
  BiUserRAProxyRefreshAt,
  BiUserRAResetPasswordStep1,
  BiUserRAResetPasswordStep2,
  BiUserRAResetPasswordStep3,
  BiUserRASignUpStep1,
  BiUserRASignUpStep2,
  BiUserRASignIn,
  BiUserRAUpdateEmailStep1,
  BiUserRAUpdateEmailStep2,

  // Posgres Output
  PgUserPLDashTop,
  PgUserPAUpdateName,
  PgUserPAUpdatePassword,
  PgUserRAResetPasswordStep1,
  PgUserRAUpdateEmailStep1,
  PgUserRASignUpStep2,
  PgUserRASignIn,

  // Redis Output
  RedisUserRAResetPasswordStep2,
  RedisUserRAUpdateEmailStep2,
  RedisUserRASignUpStep2,
} from "./index.js"

export const TbV = {
  env: TypeCompiler.Compile(Env),

  util: {
    isNumber: TypeCompiler.Compile(IsNumber),
    isString: TypeCompiler.Compile(IsString),
    isEmail: TypeCompiler.Compile(IsEmail),
    isObject: TypeCompiler.Compile(IsObject),
    decryptedV4Obj: TypeCompiler.Compile(IsDecryptedV4Obj),
    nanoId: TypeCompiler.Compile(IsNanoId),
  },

  user: {
    p: {
      a: {
        deleteAccount: {
          in: TypeCompiler.Compile(BiUserPADeleteAccount),
        },
        signOutFromAll: {
          in: TypeCompiler.Compile(BiUserPASignOutFromAll),
        },
        signOutFromOne: {
          in: TypeCompiler.Compile(BiUserPASignOutFromOne),
        },
        updateName: {
          in: TypeCompiler.Compile(BiUserPAUpdateName),
          pg: TypeCompiler.Compile(PgUserPAUpdateName),
        },
        updatePassword: {
          in: TypeCompiler.Compile(BiUserPAUpdatePassword),
          pg: TypeCompiler.Compile(PgUserPAUpdatePassword),
        },
      },
      l: {
        dashTop: {
          in: TypeCompiler.Compile(BiUserPLDashTop),
          pg: TypeCompiler.Compile(PgUserPLDashTop),
        },
      },
    },
    r: {
      a: {
        proxyRefreshAt: {
          in: TypeCompiler.Compile(BiUserRAProxyRefreshAt),
        },
        resetPasswordStep1: {
          in: TypeCompiler.Compile(BiUserRAResetPasswordStep1),
          pg: TypeCompiler.Compile(PgUserRAResetPasswordStep1),
        },
        resetPasswordStep2: {
          in: TypeCompiler.Compile(BiUserRAResetPasswordStep2),
          redis: TypeCompiler.Compile(RedisUserRAResetPasswordStep2),
        },
        resetPasswordStep3: {
          in: TypeCompiler.Compile(BiUserRAResetPasswordStep3),
        },
        updateEmailStep1: {
          in: TypeCompiler.Compile(BiUserRAUpdateEmailStep1),
          pg: TypeCompiler.Compile(PgUserRAUpdateEmailStep1),
        },
        updateEmailStep2: {
          in: TypeCompiler.Compile(BiUserRAUpdateEmailStep2),
          redis: TypeCompiler.Compile(RedisUserRAUpdateEmailStep2),
        },
        signUpStep1: {
          in: TypeCompiler.Compile(BiUserRASignUpStep1),
        },
        signUpStep2: {
          in: TypeCompiler.Compile(BiUserRASignUpStep2),
          pg: TypeCompiler.Compile(PgUserRASignUpStep2),
          redis: TypeCompiler.Compile(RedisUserRASignUpStep2),
        },
        signIn: {
          in: TypeCompiler.Compile(BiUserRASignIn),
          pg: TypeCompiler.Compile(PgUserRASignIn),
        },
      },
    },
  },
}
