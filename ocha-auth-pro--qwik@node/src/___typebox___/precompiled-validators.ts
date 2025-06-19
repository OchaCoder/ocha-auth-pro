import { TypeCompiler } from "@sinclair/typebox/compiler"
import {
  BoUserAny,
  BoUserPASignOutFromAll,
  BoUserPASignOutFromOne,
  BoUserPAUpdateName,
  BoUserPAUpdatePassword,
  BoUserPADeleteAccount,
  BoUserPLDashTop,
  BoUserRAResetPasswordStep1,
  BoUserRAResetPasswordStep2,
  BoUserRAResetPasswordStep3,
  BoUserRAUpdateEmailStep1,
  BoUserRAUpdateEmailStep2,
  BoUserRASignIn,
  BoUserRASignUpStep1,
  BoUserRASignUpStep2,
  boUserRslv,
  HealthPing,
  HealthSseFastifyHeartbeat,
  HealthSseInfra,
  IsString,
  UiEmail,
  UiHasLetter,
  UiHasNumber,
  UiHasSpecialCharacter,
  UiMaxLength50,
  UiMinLength2,
  UiMinLength4,
  UiMinLength8,
  UiName,
} from "./schemas"

export const TbV = {
  health: {
    ping: TypeCompiler.Compile(HealthPing),
    sse: {
      infraHealth: TypeCompiler.Compile(HealthSseInfra),
      fastifyHeartbeat: TypeCompiler.Compile(HealthSseFastifyHeartbeat),
    },
  },
  // Backend Output
  bo: {
    user: {
      any: TypeCompiler.Compile(BoUserAny),
      // Protected routes
      p: {
        // Action
        a: {
          deleteAccount: TypeCompiler.Compile(boUserRslv(BoUserPADeleteAccount)),
          signOutFromAll: TypeCompiler.Compile(boUserRslv(BoUserPASignOutFromAll)),
          signOutFromOne: TypeCompiler.Compile(boUserRslv(BoUserPASignOutFromOne)),
          updateName: TypeCompiler.Compile(boUserRslv(BoUserPAUpdateName)),
          updatePassword: TypeCompiler.Compile(boUserRslv(BoUserPAUpdatePassword)),
        },
        // Loader
        l: {
          dashTop: TypeCompiler.Compile(boUserRslv(BoUserPLDashTop)),
        },
      },
      // Regular routes
      r: {
        // Action
        a: {
          resetPasswordStep1: TypeCompiler.Compile(boUserRslv(BoUserRAResetPasswordStep1)),
          resetPasswordStep2: TypeCompiler.Compile(boUserRslv(BoUserRAResetPasswordStep2)),
          resetPasswordStep3: TypeCompiler.Compile(boUserRslv(BoUserRAResetPasswordStep3)),
          updateEmailStep1: TypeCompiler.Compile(boUserRslv(BoUserRAUpdateEmailStep1)),
          updateEmailStep2: TypeCompiler.Compile(boUserRslv(BoUserRAUpdateEmailStep2)),
          signIn: TypeCompiler.Compile(boUserRslv(BoUserRASignIn)),
          signUpStep1: TypeCompiler.Compile(boUserRslv(BoUserRASignUpStep1)),
          signUpStep2: TypeCompiler.Compile(boUserRslv(BoUserRASignUpStep2)),
        },
      },
    },
  },

  ui: {
    isString: TypeCompiler.Compile(IsString),
    name: TypeCompiler.Compile(UiName),
    email: TypeCompiler.Compile(UiEmail),
    hasNumber: TypeCompiler.Compile(UiHasNumber),
    hasLetter: TypeCompiler.Compile(UiHasLetter),
    hasSpecialCharacter: TypeCompiler.Compile(UiHasSpecialCharacter),
    minLength2: TypeCompiler.Compile(UiMinLength2),
    minLength4: TypeCompiler.Compile(UiMinLength4),
    minLength8: TypeCompiler.Compile(UiMinLength8),
    maxLength50: TypeCompiler.Compile(UiMaxLength50),
  },
}
