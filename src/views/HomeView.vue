<template>
  <div class="home">
    <appTitle />
    <StoriesBar />
    <SingleLineSection title="Exclusive offers" :sizes="['s', 'l', 'm']" />
    <SingleLineSection title="Plate perfections" :sizes="['m', 'l', 's']" />
    <SingleLineSection title="Deals & events" :sizes="['s', 'm', 'l']" />
    <SingleLineSection :sizes="['l', 'm', 'l']" />
    <NavBar />
    <div class=" h-10"></div>
  </div>
</template>

<script>
import appTitle from "@/components/appTitle.vue"
import SingleLineSection from "@/components/SingleLineSection.vue";
import StoriesBar from "@/components/StoriesBar.vue";
import NavBar from "@/components/NavBar.vue"

export default {
  name: 'HomeView',
  components: {
    appTitle,
    SingleLineSection,
    StoriesBar,
    NavBar
  }
}
</script>
