<template>
  <div class="app">
    <div class="spacer"/>
    <div class="content">
      <img class="my-1 logo" src="@/assets/text_logo_dark.svg">
      <slot/>
    </div>
    <div class="spacer"/>
    <div class="spacer"/>
  </div>
</template>

<script>
import Logo from '@/assets/image_logo.svg?inline'
import TextLogo from '@/assets/text_logo_dark.svg?inline'

export default {
  components: {
    Logo,
    TextLogo
  }
}
</script>

<style lang="scss">
@import '@/theme.scss';

body {
  margin: 0;
  font-family: "Roboto", "Helvetica", "Lucida Grande","DejaVu Sans","Bitstream Vera Sans",Verdana,Arial;
  background-color: #eee;
  min-width: 100%;
  overflow: auto;
}

.logo {
  height: 50px;
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 320px;
  min-height: 100vh;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 440px;
    position: relative;
    box-sizing: border-box;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    min-width: 440px;
    color: #333;

    @media (max-width: 460px) {
      min-width: 0;
      max-width: 100%;
      padding: 0 4px;
      .text-field {
        flex-direction: column;
        flex: 1;
        label {
          font-size: 12px;
        }
      }
    }
    > h1 {
      font-size: 24px;
      font-weight: 500;
      text-align: center;
    }
  }
  .text-logo {
    margin: 8px 12px;
  }
  .spacer {
    flex: 1 1;
  }
}
</style>
