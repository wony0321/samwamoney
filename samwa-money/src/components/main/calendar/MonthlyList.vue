<template>
  <div>
    <div v-if="payments.length > 0" class="payment-list">
      <h3>{{ month }}월 수입/지출 내역</h3>

      <div class="summary">
        총 수입: <span class="income">{{ totalIncome.toLocaleString() }}원</span> / 총 지출:
        <span class="expense">{{ totalExpense.toLocaleString() }}원</span>
      </div>

      <div class="payment-list-scroll">
        <div
          v-for="(item, index) in payments"
          :key="index"
          class="payment-item"
          :class="item.type === 'income' ? 'income' : 'expense'"
        >
          <div class="date">{{ formatDate(item.date) }}</div>

          <div class="title">
            <span class="icon">{{ item.icon }}</span>
            {{ item.title }}
          </div>

          <div class="amount">
            {{ item.type === 'income' ? '+' : '-' }}{{ item.amount.toLocaleString() }}원
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-message">{{ month }}월에 등록된 내역이 없어요.</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePaymentStore } from '@/stores/paymentAddStore'

const props = defineProps({
  month: Number,
})

const paymentStore = usePaymentStore()

// 해당 월의 내역 가져오기
const payments = computed(() =>
  paymentStore
    .getPaymentsByMonth(props.month)
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date)),
)

// 총 수입 계산
const totalIncome = computed(() =>
  payments.value
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0),
)

// 총 지출 계산
const totalExpense = computed(() =>
  payments.value
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0),
)

// 날짜 포맷 함수
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
}
</script>

<style scoped>
.payment-list {
  background-color: var(--white);
  border: 1px solid var(--light-yellow);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 0.5rem;
}

.summary {
  font-weight: bold;
  margin-bottom: 0.75rem;
  font-size: 14px;
}

.income {
  color: var(--blue);
}

.expense {
  color: var(--danger);
}

.payment-list-scroll {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

/* 리스트 카드 스타일 */
.payment-item {
  background: var(--white);
  border: 1px solid var(--light-yellow);
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.payment-item.income .amount {
  color: var(--blue);
}

.payment-item.expense .amount {
  color: var(--danger);
}

.date {
  flex: 1;
  font-weight: 500;
  color: var(--black);
}

.title {
  flex: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.icon {
  font-size: 1.2rem;
}

.amount {
  min-width: 100px;
  text-align: right;
  font-weight: bold;
}

.empty-message {
  background-color: var(--baby-pink);
  border: 1px solid var(--light-yellow);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 0.5rem;
  color: var(--dark-gray);
  font-style: italic;
  text-align: center;
  font-size: 14px;
}
</style>
