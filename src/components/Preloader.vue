<template>
  <div v-if="isLoading" class="static top-0 left-0 h-svh w-svw bg-white z-1 flex flex-col justify-center items-center">
    <div class="flip-box">
      <div class="flip-box-inner">
        <div class="flip-box-front">
          <img src="@/assets/logo.png" alt="Front side" />
        </div>
        <div class="flip-box-back">
          <img src="@/assets/logo.png" alt="Back side" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PreLoader",
  data() {
    return {
      isLoading: localStorage.getItem("isLoading") === "true",
    };
  },
  watch: {
    isLoading(newVal) {
      if (newVal) {
        document.body.style.overflow = "hidden"; // Block scroll
      } else {
        document.body.style.overflow = ""; // Unblock scroll
      }
    },
  },
  created() {
    document.body.style.overflow = "hidden";
    this.interval = setInterval(() => {
      this.isLoading = localStorage.getItem("isLoading") === "true";
    }, 100); // Check every second
  },
  beforeDestroy() {
    clearInterval(this.interval); // Clear the interval when the component is destroyed
  },
};
</script>

<style scoped>
.flip-box {
  height: 200px;
  width: 200px;
  background-color: transparent;
  perspective: 1000px;
}

.flip-box-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  animation: flip 4s infinite;
}

.flip-box-front,
.flip-box-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-box-front {
  background-color: #bbb;
  color: black;
}

.flip-box-back {
  background-color: #555;
  color: white;
  transform: rotateY(180deg);
}

@keyframes flip {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}
</style>
