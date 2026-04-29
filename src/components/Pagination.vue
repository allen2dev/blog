<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  page: number
  totalPages: number
}>()

const emit = defineEmits<{
  'update:page': [value: number]
}>()

const showPrev = computed(() => props.page > 1)
const showNext = computed(() => props.page < props.totalPages)

function go(p: number) {
  if (p < 1 || p > props.totalPages) return
  emit('update:page', p)
}
</script>

<template>
  <nav v-if="totalPages > 1" class="pager" aria-label="分页">
    <button
      type="button"
      class="pager-btn"
      :disabled="!showPrev"
      @click="go(page - 1)"
    >
      上一页
    </button>
    <span class="pager-info">{{ page }} / {{ totalPages }}</span>
    <button
      type="button"
      class="pager-btn"
      :disabled="!showNext"
      @click="go(page + 1)"
    >
      下一页
    </button>
  </nav>
</template>

<style scoped>
.pager {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--color-border);
}

.pager-btn {
  padding: 0.45rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  border: 1px solid var(--color-border-strong);
  border-radius: 4px;
  background: linear-gradient(180deg, #fff 0%, var(--color-btn-bg) 100%);
  color: var(--color-text);
}

.pager-btn:hover:not(:disabled) {
  border-color: var(--color-link);
  color: var(--color-link);
}

.pager-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.pager-info {
  font-size: 0.9rem;
  color: var(--color-muted);
}
</style>
