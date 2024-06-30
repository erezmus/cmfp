<template>
  <div>
    <div class="d-flex">
      <input type="text" class="w-full" v-model="search" placeholder="search schools" />
    </div>

    <ul class="w-full list-none m-0 p-0">
      <li v-for="(school, index) in  sortedResults " class="p-4 border-green-700 border-l-2 bg-blue-50" :key="index">
        <div class="h5">
          {{ school.name }}
          <template v-if="school.location">
            - {{ [school.location.city, school.location.state, school.location.country].filter(v => !!v).join(', ') }}
          </template>
        </div>
        <div class="h6">
          {{ school.teacher }}
        </div>
        <div>
          <ul class="list-none flex p-0 mt-2">
            <li v-for="social in  school.social " :key="social.name" class="pr-4">
              <a :href="social.link" target="_blank">
                <Icon :icon="social.name" prefix="fab" size="2x" />
              </a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import schools from '@/config/schools.json';
import { computed, ref } from 'vue';
import { watchThrottled } from '@vueuse/core'
import Icon from './Icon.vue';

type School = {
  name: string;
  teacher: string;
  location?: {
    city?: string;
    state?: string;
    country?: string;
  },
  social: {
    instagram?: string;
    website?: string;
    facebook?: string;
  }
}

const search = ref('');
const results = ref<School[]>(schools);

const sortedResults = computed(() =>
  [...results.value].sort((a, b) => {
    const na = a.name.toLowerCase();
    const nb = b.name.toLowerCase();
    return na < nb ? -1 : (na === nb ? 0 : 1);
  }).map(({ social, ...rest }) => {
    return {
      ...rest,
      social: Object.entries(social).map(([name, link]) => ({
        name: name === 'website' ? 'fas:link' : `fab:${name}`,
        link,
      }))
    }
  })
);

watchThrottled(search, () => {
  if (search.value === '') {
    results.value = schools;
    return;
  }

  const regex = new RegExp(`${search.value.toLowerCase()}`, "gi");
  results.value = schools.filter(school => {
    const name = school.name.toLowerCase().match(regex);
    const city = school.location.city?.toLowerCase().match(regex);
    const state = school.location.state?.toLowerCase().match(regex);
    const country = school.location.country?.toLowerCase().match(regex);
    const teacher = school.teacher.toLowerCase().match(regex);

    if (name || city || state || country || teacher) {
      return school;
    }
  });

}, {
  throttle: 500
});

</script>
