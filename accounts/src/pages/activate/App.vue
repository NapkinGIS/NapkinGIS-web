<template>
  <base-page class="activation-page">
    <h1
      v-if="error"
      class="error--text"
    >
      There was a problem with activation of your account
    </h1>
    <h1 v-else>Your account was activated</h1>

    <v-btn class="raised primary" href="/">Continue to homepage</v-btn>
  </base-page>
</template>

<script>
import BasePage from '@/BasePage'
import VBtn from '@/components/Button'

export default {
  components: {
    BasePage,
    VBtn
  },
  props: {
    error: Boolean
  }
}
</script>

<style lang="scss" scoped>
.activation-page {
  h1 {
    user-select: none;
    margin: 16px 8px;
  }
  .v-btn {
    margin: 16px 8px;
  }
}
</style>
