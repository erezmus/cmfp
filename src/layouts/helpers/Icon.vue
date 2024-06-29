<template>
  <render size="22em" />
</template>

<script setup lang="ts">
import type { IconType } from 'vue3-icons/lib';
import * as FaIcons from 'vue3-icons/fa6';
import { h } from 'vue';

export interface Props {
  icon: string;
  size?: string | number;
}

type IconMap = Record<string, IconType>;

const props = withDefaults(defineProps<Props>(), { size: 16 });
const iconName = `Fa${props.icon.slice(0, 1).toUpperCase()}${props.icon.slice(1)}`;
const icon = (FaIcons as IconMap)[iconName];
const size = typeof props.size === 'number' ? `${props.size}` : props.size?.replace('px', '');
const render = () => h(icon, { size: `${size}px` });

</script>
