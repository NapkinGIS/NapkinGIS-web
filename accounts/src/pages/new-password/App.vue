<template>
  <base-page>
    <h1 v-if="!submitted">Enter new password</h1>
    <h1 v-else>Your password was changed</h1>
    <new-password-form
      v-if="!submitted"
      @submit="submitted = true"
    />
  </base-page>
</template>

<script>
import BasePage from '@/BasePage'
import NewPasswordForm from './NewPasswordForm'

export default {
  components: {
    BasePage,
    NewPasswordForm
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
</style>
