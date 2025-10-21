import type { UserInput } from '~/stores/user'
export type UserErrors = Partial<Record<keyof UserInput, string>>

export function validateUser(input: UserInput): { ok: true } | { ok: false; errors: UserErrors } {
  const errors: UserErrors = {}
  if (!input.name || input.name.trim().length === 0) errors.name = '必填'
  const ageNum = Number(input.age)
  if (!Number.isFinite(ageNum) || ageNum < 0 || ageNum > 150) errors.age = '年齡需為 0~150 的數字'
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true }
}
