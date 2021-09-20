<template>
  <v-speed-dial
    v-model="fab"
    :top="false"
    :bottom="true"
    :right="true"
    :left="false"
    :direction="'top'"
    :open-on-hover="false"
    :transition="'slide-y-reverse'"
    class="map-speed-dial"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" color="blue darken-2" dark fab small>
        <v-icon v-if="fab"> mdi-close </v-icon>
        <v-icon v-else> mdi-map </v-icon>
      </v-btn>
    </template>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="$emit('changeMap', 'default')"
          text
          v-bind="attrs"
          v-on="on"
          x-small
          class="ma-1 pa-0 mx-2"
          :class="selectedMap == 'default' ? 'active' : ''"
        >
          <span class="d-flex flex-column align-center">
            <v-img max-width="30px" src="/map-def.png" />
          </span>
        </v-btn>
      </template>
      <p class="ma-0">پیش فرض</p>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="$emit('changeMap', 'hybrid')"
          text
          v-bind="attrs"
          v-on="on"
          x-small
          class="ma-1 pa-0 mx-2"
          :class="selectedMap == 'hybrid' ? 'active' : ''"
        >
          <span class="d-flex flex-column align-center">
            <v-img max-width="30px" src="/map-hybrid.png" />
          </span>
        </v-btn>
      </template>
      <p class="ma-0">ترکیبی</p>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="$emit('changeMap', 'satellite')"
          text
          v-bind="attrs"
          v-on="on"
          x-small
          class="ma-1 pa-0 mx-2"
          :class="selectedMap == 'satellite' ? 'active' : ''"
        >
          <span class="d-flex flex-column align-center">
            <v-img max-width="30px" src="/map-satellite.png" />
          </span>
        </v-btn>
      </template>
      <p class="ma-0">ماهواره ای</p>
    </v-tooltip>
  </v-speed-dial>
</template>

<script>
export default {
  props: ["selectedMap"],
  data: () => ({
    fab: false,
  }),
};
</script>

<style></style>
