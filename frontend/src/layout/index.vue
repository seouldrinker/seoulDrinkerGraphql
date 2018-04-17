<template>
  <div id="commonLayout">
    <slot name="header">
      <header>
        <div class="header__logo">
          <img src="../assets/common/logo.png" alt="SeoulDrinker">
        </div>
      </header>
    </slot>
    <slot name="contents">
      <main>
        <div class="loader">
          <svg viewBox="0 0 32 32" width="32" height="32">
            <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
          </svg>
        </div>
      </main>
    </slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
#commonLayout {
  header {
    margin: 0;
    height: 45px;
    padding: 0 18px;
    background-color: #eea51b;
    color: #ffffff;
    box-shadow: 0 0 10px #4a5156;
    &.invisible {
      background-color: rgba(0,0,0,0);
      box-shadow: none;
    }
    & > .header__logo {
      position: relative;
      width: 120px;
      padding: 10px 0 0 0;
      margin: 0 auto;
      font-size: 20px;
      line-height: 1;
      letter-spacing: .02em;
      font-weight: 400;
      box-sizing: border-box;
      img {
        width: 100%;
      }
    }
    & > .header__text {
      padding: 10px 0 0 0;
      & > span {
        display: inline-block;
        vertical-align: top;
        &.logo {
          width: 24px;
          height: 24px;
          &:hover {
            cursor: pointer;
          }
          & > img {
            width: 100%;
            height: 100%;
          }
        }
        &.title {
          margin: 2px 0 0 6px;
          &.noBack {
            margin: 2px 0 0 34px;
          }
          font-size: 15px;
          font-weight: 800;
        }
        &.rank {
          float: right;
          &:hover {
            cursor: pointer;
          }
          &:after {
            content: '';
            display: table;
            clear: both;
          }
        }
      }
    }
  }

  main {
    &.detailHeight {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: -1;
    }
    ul {
      li {
        div {
          word-wrap: break-word;
        }
      }
    }
  }

  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}

.loader {
  left: 50%;
  top: 50%;
  position: fixed;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  #spinner {
    box-sizing: border-box;
    stroke: #673AB7;
    stroke-width: 3px;
    -webkit-transform-origin: 50%;
    transform-origin: 50%;
    -webkit-animation: line 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite, rotate 1.6s linear infinite;
    animation: line 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite, rotate 1.6s linear infinite;
  }

  @-webkit-keyframes rotate {
    from {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    to {
      -webkit-transform: rotate(450deg);
      transform: rotate(450deg);
    }
  }

  @keyframes rotate {
    from {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    to {
      -webkit-transform: rotate(450deg);
      transform: rotate(450deg);
    }
  }

  @-webkit-keyframes line {
    0% {
      stroke-dasharray: 2, 85.964;
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    50% {
      stroke-dasharray: 65.973, 21.9911;
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dasharray: 2, 85.964;
      stroke-dashoffset: -65.973;
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }

  @keyframes line {
    0% {
      stroke-dasharray: 2, 85.964;
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    50% {
      stroke-dasharray: 65.973, 21.9911;
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dasharray: 2, 85.964;
      stroke-dashoffset: -65.973;
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }
}
</style>
