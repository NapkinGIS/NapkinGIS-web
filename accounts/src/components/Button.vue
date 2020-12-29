<template>
  <component
    :is="href ? 'a' : 'button'"
    type="button"
    class="v-btn"
    :class="classes"
    :disabled="disabled"
    :href="disabled ? '#' : href"
    @click="$emit('click', $event)"
  >
    <div class="v-btn__content">
      <slot/>
    </div>
  </component>
</template>

<script>
export default {
  props: {
    disabled: Boolean,
    raised: Boolean,
    primary: Boolean,
    transparent: Boolean,
    icon: Boolean,
    href: String
  },
  computed: {
    classes () {
      return {
        raised: this.raised,
        primary: this.primary,
        transparent: this.transparent,
        icon: this.icon
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  border-radius: 2px;
  min-width: 24px;
  transition: all .4s cubic-bezier(.25,.8,.25,1);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
  &:hover:not([disabled]):not(.transparent) {
    &::before {
      background-color: rgba(#222, 0.1);
    }
  }
  &:not(.icon) {
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    text-decoration: none;
    height: 36px;
    line-height: 36px;
    padding: 0 16px;
    margin: 4px 8px;
    white-space: nowrap;
  }
  &.icon {
    padding: 0;
    font-size: 16px;
  }
  &:not([disabled]) {
    cursor: pointer;
  }
  &.raised {
    box-shadow: 0 1px 5px rgba(0,0,0,.2),0 2px 2px rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12);
  }
  &[disabled] {
    background-color: transparent;
    color: rgba(#222, 0.5);
  }
  .v-btn__content {
    position: relative;
  }
}
</style>
