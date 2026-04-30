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
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e5e5e5;
}

.pager-btn {
  padding: 8px 14px;
  font-size: 13px;
  cursor: pointer;
  border: 1px solid #dba500;
  border-radius: 2px;
  background: linear-gradient(#ffe788, #ffce38);
  color: #333;
  font-weight: bold;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    0 1px 1px rgba(0, 0, 0, 0.08);
}

.pager-btn:hover:not(:disabled) {
  background: #ffeca0;
}

.pager-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.pager-info {
  font-size: 13px;
  color: #666;
}
</style>
