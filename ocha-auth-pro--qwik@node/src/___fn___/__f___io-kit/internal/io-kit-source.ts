import { TbV } from "~/___typebox___/precompiled-validators"

const inputBuilder = {
  withUserInput: (userInput: unknown) => ({ hasData: true as const, data: userInput }),
  noUserInput: () => ({ hasData: false as const, data: null }),
}

export const ioKitSource = {
  bo: {
    user: {
      p: {
        l: {
          dashTop: {
            code: "BO_USER_PL_DASH_TOP" as const,
            path: `/user/protected/load/dashboard-top`,
            validator: TbV.bo.user.p.l.dashTop,
            inputBuilder: inputBuilder.noUserInput,
          },
        },
        a: {
          deleteAccount: {
            code: "BO_USER_PA_DELETE_ACCOUNT" as const,
            path: `/user/protected/action/delete-account`,
            validator: TbV.bo.user.p.a.deleteAccount,
            inputBuilder: inputBuilder.noUserInput,
          },
          signOutFromOne: {
            code: "BO_USER_PA_SIGN_OUT_FROM_ONE" as const,
            path: `/user/protected/action/sign-out-from-one`,
            validator: TbV.bo.user.p.a.signOutFromOne,
            inputBuilder: inputBuilder.withUserInput,
          },
          signOutFromAll: {
            code: "BO_USER_PA_SIGN_OUT_FROM_ALL" as const,
            path: `/user/protected/action/sign-out-from-all`,
            validator: TbV.bo.user.p.a.signOutFromAll,
            inputBuilder: inputBuilder.noUserInput,
          },
          updateName: {
            code: "BO_USER_PA_UPDATE_NAME" as const,
            path: `/user/protected/action/update-name`,
            validator: TbV.bo.user.p.a.updateName,
            inputBuilder: inputBuilder.withUserInput,
          },
          updatePassword: {
            code: "BO_USER_PA_UPDATE_PASSWORD" as const,
            path: `/user/protected/action/update-password`,
            validator: TbV.bo.user.p.a.updatePassword,
            inputBuilder: inputBuilder.withUserInput,
          },
        },
      },
      r: {
        a: {
          signUpStep1: {
            code: "BO_USER_RA_SIGN_UP_STEP1" as const,
            path: `/user/regular/action/sign-up-step-1`,
            validator: TbV.bo.user.r.a.signUpStep1,
            inputBuilder: inputBuilder.withUserInput,
          },
          signUpStep2: {
            code: "BO_USER_RA_SIGN_UP_STEP2" as const,
            path: `/user/regular/action/sign-up-step-2`,
            validator: TbV.bo.user.r.a.signUpStep2,
            inputBuilder: inputBuilder.withUserInput,
          },
          signIn: {
            code: "BO_USER_RA_SIGN_IN" as const,
            path: `/user/regular/action/sign-in`,
            validator: TbV.bo.user.r.a.signIn,
            inputBuilder: inputBuilder.withUserInput,
          },
          resetPasswordStep1: {
            code: "BO_USER_RA_RESET_PASSWORD_STEP1" as const,
            path: `/user/regular/action/reset-password-step-1`,
            validator: TbV.bo.user.r.a.resetPasswordStep1,
            inputBuilder: inputBuilder.withUserInput,
          },
          resetPasswordStep2: {
            code: "BO_USER_RA_RESET_PASSWORD_STEP2" as const,
            path: `/user/regular/action/reset-password-step-2`,
            validator: TbV.bo.user.r.a.resetPasswordStep2,
            inputBuilder: inputBuilder.withUserInput,
          },
          resetPasswordStep3: {
            code: "BO_USER_RA_RESET_PASSWORD_STEP3" as const,
            path: `/user/regular/action/reset-password-step-3`,
            validator: TbV.bo.user.r.a.resetPasswordStep3,
            inputBuilder: inputBuilder.withUserInput,
          },

          dashUpdateEmailStep1: {
            code: "BO_USER_RA_UPDATE_EMAIL_STEP1" as const,
            path: `/user/regular/action/update-email-step-1`,
            validator: TbV.bo.user.r.a.updateEmailStep1,
            inputBuilder: inputBuilder.withUserInput,
          },
          dashUpdateEmailStep2: {
            code: "BO_USER_RA_UPDATE_EMAIL_STEP2" as const,
            path: `/user/regular/action/update-email-step-2`,
            validator: TbV.bo.user.r.a.updateEmailStep2,
            inputBuilder: inputBuilder.withUserInput,
          },
        },
      },
    },
  },
}
