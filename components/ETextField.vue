<template>
  <div class="etf">
    <label v-if="label" :for="uid" class="etf__label">{{ label }}</label>
    <input :id="uid" :type="type" v-model="model" :placeholder="placeholder" class="etf__input" />
    <p v-if="error" class="etf__error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'

interface Props {
  id?: string
  label?: string
  type?: 'text' | 'number'
  placeholder?: string
  error?: string
}
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
})

const model = defineModel<string | number>({ default: '' })

const uid = computed(() => props.id ?? `etf-${useId()}`)
</script>

<style scoped lang="scss">
.etf {
  &__label {
    display: block;
    margin-bottom: 0.25rem;
    color: #ddd;
  }
  &__input {
    width: 90%;
    padding: 0.6rem 0.8rem;
    border-radius: 0.5rem;
    border: 1px solid #4b4b4b;
    background: #2b2b2b;
    color: #fff;
    outline: none;
    &:focus {
      border-color: #888;
    }
  }
  &__error {
    color: #ff6b6b;
    font-size: 12px;
    margin-top: 0.25rem;
  }
}
</style>
