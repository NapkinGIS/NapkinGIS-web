<template>
  <form autocomplete="off" spellcheck="false">
    <p
      v-if="errorMsg"
      class="error--text"
      v-text="errorMsg"
    />
    <p v-else>Please enter your new password twice so we can verify you typed it in correctly.</p>
    <text-field
      label="New password"
      class="required"
      :type="passwordVisible ? 'text' : 'password'"
      v-model="form.new_password1"
      :error="validators.new_password1.error"
      @input="validators.new_password1.validate"
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
      :type="passwordVisible ? 'text' : 'password'"
      v-model="form.new_password2"
      :error="validators.new_password2.error"
      @input="validators.new_password2.validate"
    />
    <v-button
      raised primary
      :disabled="processing || !formValid"
      @click="setPassword"
    >
      Set password
    </v-button>
  </form>
</template>

<script>
import TextField from '@/components/TextField'
import VButton from '@/components/Button'
import VIcon from '@/components/Icon'
import { createValidator, requiredValidator } from '@/validators.js'

export default {
  components: {
    TextField,
    VButton,
    VIcon
  },
  data () {
    return {
      processing: false,
      passwordVisible: false,
      errorMsg: '',
      form: {
        new_password1: '',
        new_password2: ''
      }
    }
  },
  computed: {
    validators () {
      return {
        new_password1: createValidator([
          requiredValidator,
          () => {
            if (this.form.new_password2) {
              this.validators.new_password2.validate(this.form.new_password2)
            }
          }
        ]),
        new_password2: createValidator([
          requiredValidator,
          value => value !== this.form.new_password1 && "Password doesn't match"
        ])
      }
    },
    formValid () {
      return Object.values(this.validators).every(v => v.checked && !v.validating && !v.error)
    }
  },
  methods: {
    async setPassword () {
      // simple URL params parsing (even decoding is not needed) to avoid url polyfill
      const urlParams = {}
      location.search.substring(1).split('&').forEach(part => {
        const [name, value] = part.split('=')
        urlParams[name] = value
      })
      const { uid, token } = urlParams

      this.processing = true
      this.errorMsg = ''
      const response = await fetch(`/api/accounts/new_password/${uid}/${token}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form)
      })
      this.processing = false
      if (response.ok) {
        this.$emit('submit')
      } else {
        const data = await response.json()
        this.errorMsg = data.error || 'Failed to set a new password'
        if (response.status === 400) {
          Object.keys(data).forEach(key => {
            if (this.validators[key]) {
              this.validators[key].error = data[key][0]
            }
          })
        }
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

  p {
    font-size: 14px;
    &:not(.error--text) {
      color: #777;
    }
  }
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
