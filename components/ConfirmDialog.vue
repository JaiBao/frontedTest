<script setup lang="ts">
const open = defineModel<boolean>({ default: false })
const props = defineProps<{ title?: string; message?: string }>()
const emit = defineEmits<{ (e: 'confirm'): void; (e: 'cancel'): void }>()

const close = (ok: boolean) => {
  open.value = false
  ok ? emit('confirm') : emit('cancel')
}
</script>

<template>
  <dialog :open="open" class="rounded-2xl p-0 w-[90vw] max-w-[420px]">
    <form method="dialog" class="p-4">
      <h3 class="text-lg font-semibold mb-2">{{ props.title || $t('confirm') }}</h3>
      <p class="mb-4">{{ props.message }}</p>
      <div class="flex justify-end gap-2">
        <button
          class="px-4 py-2 rounded-lg border bg-gray-600 text-white hover:bg-gray-700 transition"
          @click.prevent="close(false)"
        >
          {{ $t('cancel') }}
        </button>
        <button
          class="px-4 py-2 rounded-lg border bg-green-600 text-white hover:bg-green-700 transition"
          @click.prevent="close(true)"
        >
          {{ $t('confirm') }}
        </button>
      </div>
    </form>
  </dialog>
</template>

<style scoped>
dialog::backdrop {
  background: rgba(0, 0, 0, 0.35);
}
</style>
