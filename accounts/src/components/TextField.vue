<template>
  <div class="text-field">
    <label :class="labelClass">{{ label }}</label>
    <div class="column">
      <div class="field" :class="fieldClass">
        <input
          :value="value"
          :type="type"
          @input="updateValue"
          :name="name"
          :autocomplete="autocomplete"
          @focus="focus = true"
          @blur="focus = false"
          :readonly="!focus"
        />
        <div class="append">
          <slot name="append"/>
        </div>
      </div>
      <small class="error-msg error--text">{{ error }}</small>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    type: String,
    label: String,
    name: String,
    autocomplete: String,
    error: String
  },
  data () {
    return {
      focus: false
    }
  },
  computed: {
    fieldClass () {
      return {
        'error--text': !!this.error,
        'primary--text': !this.error && this.focus,
        focus: this.focus
      }
    },
    labelClass () {
      return { 'error--text': !!this.error }
    }
  },
  methods: {
    updateValue (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.text-field {
  margin: 16px 0;
  display: flex;

  label {
    font-size: 15px;
    opacity: 0.85;
    line-height: 32px;
    margin-right: 12px;
  }
  .column {
    display: flex;
    flex-direction: column;
    flex: 1 0;
    color: #aaa;
  }
  .field {
    display: flex;
    align-items: center;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      height: 1px;
      bottom: 0;
      background-color: currentColor;
      transition: all .4s cubic-bezier(.25,.8,.25,1);
    }
    &.focus {
      &:after {
        height: 2px;
      }
    }
  }
  input {
    display: inline-block;
    color: #111;
    border-width: 0 0 1px 0;
    font-size: 17px;
    outline: none;
    height: 32px;
    padding-bottom: 1px;
    box-sizing: border-box;
    background-color: transparent;
    flex: 1;
    max-width: 360px;
    &:focus {
      border-color: currentColor;
      padding-bottom: 0;
      border-width: 0 0 2px 0;
    }
  }
  .error-msg {
    height: 1em;
    margin: 2px 0;
  }
}
</style>
