<template>
  <base-page>
    <h1 v-if="!submitted">Create a New Account</h1>
    <h1 v-else>Account was created</h1>
    <sign-up-form
      v-if="!submitted"
      @submit="submitted = true"
    />
    <p v-else>
      Before you can sign in, you must active your account. Activation link was sent to your email address.
    </p>
  </base-page>
</template>

<script>
import BasePage from '@/BasePage'
import SignUpForm from './SignUpForm'

export default {
  components: {
    BasePage,
    SignUpForm
  },
  data () {
    return {
      submitted: false
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  margin-bottom: 1em;
  min-width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  color: #333;
}
p {
  text-align: center;
}
</style>
