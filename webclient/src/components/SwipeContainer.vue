<template>
  <div class="main-container">
    <v-btn
      dark
      color="grey darken-2"
      class="panel-toggle"
      :class="{expanded: visible}"
      @click="toggle"
    >
      <icon name="arrow-right"/>
    </v-btn>

    <v-layout
      class="swipe-content"
      @transitionend.self="transitionend"
    >
      <!-- <div> -->
      <slot/>
      <!-- </div> -->
    </v-layout>
  </div>
</template>

<script>
const Events = {
  pointerdown: {
    move: 'pointermove',
    end: 'pointerup',
    xPos: e => e.pageX,
    yPos: e => e.pageY
  },
  mousedown: {
    move: 'mousemove',
    end: 'mouseup',
    xPos: e => e.pageX,
    yPos: e => e.pageY
  },
  touchstart: {
    move: 'touchmove',
    end: 'touchend',
    xPos: e => e.touches[0].pageX,
    yPos: e => e.touches[0].pageY
  }
}
const Touch = {
  xPos: e => e.touches[0].pageX,
  yPos: e => e.touches[0].pageY
}

export default {
  data () {
    return {
      visible: true
    }
  },
  mounted () {
    const el = this.$el
    let wasVisible
    let moveStarted
    let originX
    let offsetX
    let maxOffset

    const unbind = this.$swiper.bind({
      test: e => {
        const x = Events[e.type].xPos(e)
        return (this.visible && x > 260 && x < 310) || (!this.visible && x < 20)
      },
      start: e => {
        originX = Touch.xPos(e)
        wasVisible = this.visible
        moveStarted = false
      },
      move: e => {
        offsetX = Touch.xPos(e) - originX
        if (!moveStarted) {
          moveStarted = true
          el.style.display = ''
          el.style.transition = ''
          maxOffset = el.clientWidth
        }
        if (wasVisible) {
          el.style.transform = `translate3d(${Math.min(0, offsetX)}px, 0, 0)`
        } else {
          const op = offsetX < 0 ? '-' : '+'
          const offset = Math.abs(Math.min(maxOffset, offsetX))
          el.style.transform = `translate3d(calc(-100% ${op} ${offset}px), 0, 0)`
        }
      },
      end: e => {
        if ((offsetX < -50 && this.visible) || (offsetX < 100 && !wasVisible)) {
          el.style.transition = 'transform 0.5s cubic-bezier(.25,.8,.5,1)'
          el.style.transform = `translate3d(-100%, 0, 0)`
          this.visible = false
          // console.log('## End -> HIDE')
        }
        if ((wasVisible && Math.abs(offsetX) < 50) || (offsetX > 100 && !wasVisible)) {
          this.visible = true
          el.style.transition = 'transform 0.3s cubic-bezier(.25,.8,.5,1)'
          el.style.transform = 'translate3d(0, 0, 0)'
          // console.log('## End -> OPEN')
        }
      }
    })
    this.$once('hook:beforeDestroy', unbind)
  },
  methods: {
    transitionend (e) {
      if (e.propertyName === 'transform') {
        // console.log('--- transitionend ---')
        const el = e.target
        if (!this.visible) {
          el.style.display = 'none'
        }
        el.style.transition = ''
      }
    },
    toggle (newVal, oldVal) {
      const el = this.$el

      if(this.visible) {
        el.style.transition = 'transform 0.5s cubic-bezier(.25,.8,.5,1)'
        el.style.transform = `translate3d(-100%, 0, 0)`
        this.visible = false
      }else{
        this.visible = true
        el.style.transition = 'transform 0.3s cubic-bezier(.25,.8,.5,1)'
        el.style.transform = 'translate3d(0, 0, 0)'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  width: 288px;
  height: 100vh;
  max-height: 100vh;
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 1fr minmax(0, max-content) minmax(0, min-content) minmax(0, min-content);

  .swipe-content {
    transition-timing-function: cubic-bezier(.25,.8,.5,1);
    overflow: hidden;
    grid-column: 1 / 2;
    grid-row: 1 / 5;
    width: 288px;
    z-index: 2;
  }

  .panel-toggle {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    min-width: 40px;
    z-index: 1;
  }
}
</style>
