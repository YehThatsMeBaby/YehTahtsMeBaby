import {
    incrementCustomProperty,
    setCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const BoyElem = document.querySelector("[data-boy]")
  const JUMP_SPEED = 0.45
  const GRAVITY = 0.0015
  const BOY_FRAME_COUNT = 2
  const FRAME_TIME = 100
  
  let isJumping
  let BoyFrame
  let currentFrameTime
  let yVelocity
  export function setupBoy() {
    isJumping = false
    BoyFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(BoyElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
  }
  
  export function updateBoy(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
  }
  
  export function getBoyRect() {
    return BoyElem.getBoundingClientRect()
  }
  
  export function setBoyLose() {
    BoyElem.src = "imgs/bluefish.png"
  }
  
  function handleRun(delta, speedScale) {
    if (isJumping) {
      BoyElem.src = `imgs/boystand.png`
      return
    }
  
    if (currentFrameTime >= FRAME_TIME) {
      BoyFrame = (BoyFrame + 1) % BOY_FRAME_COUNT
      BoyElem.src = `imgs/boyRun${BoyFrame}.png`
      currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
  }
  
  function handleJump(delta) {
    if (!isJumping) return
  
    incrementCustomProperty(BoyElem, "--bottom", yVelocity * delta)
  
    if (getCustomProperty(BoyElem, "--bottom") <= 0) {
      setCustomProperty(BoyElem, "--bottom", 0)
      isJumping = false
    }
  
    yVelocity -= GRAVITY * delta
  }
  
  function onJump(e) {
    if (e.code !== "Space" || isJumping) return
  
    yVelocity = JUMP_SPEED
    isJumping = true
  }