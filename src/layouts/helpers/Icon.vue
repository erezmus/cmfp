<template>
  <FontAwesomeIcon :icon="[prefix, `fa-${icon}`]" :size="size" />
</template>

<script setup lang="ts">
import { FontAwesomeIcon, type FontAwesomeIconProps } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

export interface Props {
  icon: string;
  size?: string;
}

library.add(fab);
library.add(far);
library.add(fas);

const props = defineProps<Props>();
const [prefix, icon] = props.icon.toLowerCase().split(':');
const size = (`${props.size}` || '1x') as FontAwesomeIconProps['size'];

</script>
