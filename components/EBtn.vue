<template>
  <button :class="['e-btn', variantClass]" @click="$emit('click')">
    <span v-if="text">{{ text }}</span>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text?: string
    /** success(綠) / error(紅) / warn(黃) */
    color?: 'success' | 'error' | 'warn'
    disabled?: boolean
  }>(),
  { color: 'success', disabled: false }
)

defineEmits<{ (e: 'click'): void }>()

const variantClass = computed(() => `e-btn-${props.color}`)
</script>

<style scoped lang="scss">
.e-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.12s ease,
    filter 0.12s ease,
    box-shadow 0.12s ease,
    opacity 0.12s ease;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.06) inset,
    0 2px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    filter: brightness(0.98);
  }
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &-success {
    background: #2e7d32;
    color: #fff;
  }
  &-error {
    background: #c62828;
    color: #fff;
  }
  &-warn {
    background: #f9a825;
    color: #222;
  }
}
</style>
