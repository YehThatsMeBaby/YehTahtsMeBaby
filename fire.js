import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.05
  const FIRE_INTERVAL_MIN = 500
  const FIRE_INTERVAL_MAX = 2000
  const worldElem = document.querySelector("[data-world]")
  
  let nextFireTime
  export function setupFire() {
    nextFireTime = FIRE_INTERVAL_MIN
    document.querySelectorAll("[data-Fire]").forEach(Fire => {
        Fire.remove()
    })
  }
  
  export function updateFire(delta, speedScale) {
    document.querySelectorAll("[data-Fire]").forEach(Fire => {
      incrementCustomProperty(Fire, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(Fire, "--left") <= -100) {
        Fire.remove()
      }
    })
  
    if (nextFireTime <= 0) {
      createFire()
      nextFireTime =
        randomNumberBetween(FIRE_INTERVAL_MIN, FIRE_INTERVAL_MAX) / speedScale
    }
    nextFireTime -= delta
  }
  
  export function getFireRects() {
    return [...document.querySelectorAll("[data-Fire]")].map(Fire => {
      return Fire.getBoundingClientRect()
    })
  }
  
  function createFire() {
    const Fire = document.createElement("img")
    Fire.dataset.Fire = true
    Fire.src = "imgs/fire.png"
    Fire.classList.add("Fire")
    setCustomProperty(Fire, "--left", 100)
    worldElem.append(Fire)
  }
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }