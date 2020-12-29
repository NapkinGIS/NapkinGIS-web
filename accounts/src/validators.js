import Vue from 'vue'
import debounce from 'lodash/debounce'

export const requiredValidator = value => !value && 'Field is required'
export const minLengthValidator = length => value => value.length < length && `Required at least ${length} characters`
const isValidEmail = email => /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)
export const emailValidator = value => !isValidEmail(value) && 'Invalid email address'

export function createValidator (rules, debounceTime = 350) {
  const validator = {
    error: null,
    validating: false,
    checked: false
  }
  Vue.observable(validator)

  async function validate (value) {
    for (const rule of rules) {
      const err = rule(value)
      if (err && typeof err === 'string') {
        return err
      }
      if (err && err instanceof Promise) {
        const errValue = await err
        if (errValue && typeof errValue === 'string') {
          return errValue
        }
      }
    }
    return ''
  }
  const debouncedValidate = debounce(async value => {
    const err = await validate(value)
    validator.error = err
    validator.checked = true
    validator.validating = false
  }, debounceTime)

  validator.validate = function (value) {
    validator.validating = true
    validator.error = ''
    debouncedValidate(value)
  }
  return validator
}
