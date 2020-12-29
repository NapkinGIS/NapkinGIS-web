<template>
  <form autocomplete="off" spellcheck="false">
    <!-- Hidden fields as workaround for chrome browser to ignore autocomplete/autofill -->
    <text-field
      label="Username"
      class="required"
      v-model="form.username"
      :error="validators.username.error"
      @input="validators.username.validate"
    >
      <template v-slot:append>
        <validator-mark :validator="validators.username"/>
      </template>
    </text-field>
    <text-field
      label="First name"
      v-model="form.first_name"
    />
    <text-field
      label="Last name"
      v-model="form.last_name"
    />
    <text-field
      label="Email"
      class="required"
      type="email"
      name="email"
      autocomplete="email"
      v-model="form.email"
      :error="validators.email.error"
      @input="validators.email.validate"
    >
      <template v-slot:append>
        <validator-mark :validator="validators.email"/>
      </template>
    </text-field>
    <text-field
      label="Password"
      class="required"
      name="new-password"
      autocomplete="new-password"
      v-model="form.password1"
      :type="passwordVisible ? 'text' : 'password'"
      :error="validators.password1.error"
      @input="validators.password1.validate"
    >
      <template v-slot:append>
        <v-button
          class="icon transparent"
          @click="passwordVisible = !passwordVisible"
        >
          <v-icon :name="passwordVisible ? 'visibility' : 'visibility_off'"/>
        </v-button>
      </template>
    </text-field>
    <text-field
      label="Confirm password"
      class="required"
      autocomplete="new-password"
      v-model="form.password2"
      :type="passwordVisible ? 'text' : 'password'"
      :error="validators.password2.error"
      @input="validators.password2.validate"
    />
    <v-button
      raised primary
      dark
      :disabled="processing || !formValid"
      @click="createAccount"
    >
      Create Account
    </v-button>
  </form>
</template>

<script>
import TextField from '@/components/TextField'
import VButton from '@/components/Button'
import VIcon from '@/components/Icon'
import { createValidator, requiredValidator, minLengthValidator, emailValidator } from '@/validators.js'

const ValidatorMark = {
  functional: true,
  props: {
    validator: Object
  },
  render (h, ctx) {
    const { error, validating, checked } = ctx.props.validator
    if (checked && !validating) {
      const symbol = error ? 'error_outline' : 'check_circle_outline'
      return <VIcon size={22} name={symbol}/>
    }
    return null
  }
}

export default {
  components: {
    TextField,
    VButton,
    VIcon,
    ValidatorMark
  },
  data () {
    return {
      processing: false,
      passwordVisible: false,
      form: {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password1: '',
        password2: ''
      }
    }
  },
  computed: {
    validators () {
      return {
        username: createValidator([
          requiredValidator,
          minLengthValidator(3),
          value => this.checkLoginParam('username', value, 'A user with that username already exists.')
        ]),
        email: createValidator([
          requiredValidator,
          emailValidator,
          value => this.checkLoginParam('email', value, 'A user with that email already exists.')
        ]),
        password1: createValidator([
          requiredValidator,
          () => {
            if (this.form.password2) {
              this.validators.password2.validate(this.form.password2)
            }
          }
        ]),
        password2: createValidator([
          requiredValidator,
          value => value !== this.form.password1 && "Password doesn't match"
        ])
      }
    },
    formValid () {
      return Object.values(this.validators).every(v => v.checked && !v.validating && !v.error)
    }
  },
  methods: {
    async checkLoginParam (param, value, errMsg) {
      const response = await fetch(`/api/accounts/check_login/?${param}=${encodeURIComponent(value)}`)
      if (response.ok) {
        const data = await response.json()
        return !data.available && errMsg
      }
      return 'Failed to check availability'
    },
    async createAccount () {
      this.processing = true
      const response = await fetch('/api/accounts/create/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form)
      })
      this.processing = false
      if (response.ok) {
        this.$emit('submit')
      } if (response.status === 400) {
        const data = await response.json()
        Object.keys(data).forEach(key => {
          if (this.validators[key]) {
            this.validators[key].error = data[key][0]
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  background-color: #eee;
  padding: 1em 1.5em;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ::v-deep .text-field {
    width: 100%;
    label {
      min-width: 130px;
    }
    &.required label {
      font-weight: 500;
    }
  }
}
</style>
