<template>
  <div class="home">
    <appTitle />
    <StoriesBar />
    <SingleLineSection title="Exclusive offers"
      :sizes="[{ size: 's', image: box1 }, { size: 'm', image: box2 }, { size: 's', image: box3 }]" />
    <SingleLineSection title="Plate perfections" :sizes="[{ size: 'l', image: box4 }, { size: 's', image: box5 }]" />
    <SingleLineSection title="Deals & events"
      :sizes="[{ size: 'm', image: box6 }, { size: 's', image: box7 }, { size: 'l', image: box8 }]" />
    <SingleLineSection :sizes="[{ size: 's', image: box4 }, { size: 'm', image: box2 }, { size: 's', image: box6 }]" />
    <NavBar />
    <div class=" h-10"></div>
  </div>
</template>

<script>
import appTitle from "@/components/appTitle.vue"
import SingleLineSection from "@/components/SingleLineSection.vue";
import StoriesBar from "@/components/StoriesBar.vue";
import NavBar from "@/components/NavBar.vue"
import box1 from "@/assets/Home Page/Exclusive Offers/box1.jpg"
import box2 from "@/assets/Home Page/Exclusive Offers/box2.jpg"
import box3 from "@/assets/Home Page/Palete Perfections/box3.jpg"
import box4 from "@/assets/Home Page/Palete Perfections/box4.jpg"
import box5 from "@/assets/Home Page/Story/box5.jpg"
import box6 from "@/assets/Home Page/Story/box6.jpg"
import box7 from "@/assets/Home Page/Story/box7.jpg"
import box8 from "@/assets/Home Page/Story/box8.jpg"

export default {
  name: 'HomeView',
  components: {
    appTitle,
    SingleLineSection,
    StoriesBar,
    NavBar
  },
  data() {
    return {
      box1,
      box2,
      box3,
      box4,
      box5,
      box6,
      box7,
      box8
    }
  }
}
</script>
