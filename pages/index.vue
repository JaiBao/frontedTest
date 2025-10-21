<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useUserStore, type User, type UserInput } from '~/stores/user'
import { validateUser, type UserErrors } from '~/composables/validators/user'

const { t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const store = useUserStore()
const { list } = storeToRefs(store)

// server fetch 初始資料
const { data: initialUsers, error } = await useAsyncData(
  'users',
  async () => await $fetch<User[]>('/api/user', { method: 'GET' }),
  { server: true }
)
if (error.value) console.warn('[server fetch users] failed:', error.value)
if (initialUsers.value) store.setUsers(initialUsers.value)

async function reloadUsers() {
  const res = await $fetch<User[]>('/api/user', { method: 'GET' })
  store.setUsers(res)
}

// 表
const editing = ref<User | null>(null)
const form = reactive<UserInput>({ name: '', age: 0 })
const errors = reactive<UserErrors>({})
const showConfirm = ref(false)
const confirmMessage = ref('')
let pending: null | (() => Promise<void>) = null

function resetForm() {
  editing.value = null
  form.name = ''
  form.age = 0
  Object.keys(errors).forEach((k) => delete (errors as any)[k])
}
function fillForm(u: User) {
  editing.value = u
  form.name = u.name
  form.age = u.age
}
function runValidation() {
  Object.keys(errors).forEach((k) => delete (errors as any)[k])
  const r = validateUser(form)
  if (!r.ok) Object.assign(errors, r.errors)
  return r.ok
}
function askConfirm(msg: string, action: () => Promise<void>) {
  confirmMessage.value = msg
  pending = action
  showConfirm.value = true
}
async function onConfirm() {
  if (pending) await pending()
  pending = null
}

//submit
async function submit() {
  if (!runValidation()) return
  const name = form.name.trim()
  const age = Number(form.age)
  const isEdit = !!editing.value

  askConfirm(t(isEdit ? 'confirmUpdate' : 'confirmCreate') as string, async () => {
    if (isEdit) {
      const body: User = { id: Number(editing.value!.id), name, age }
      await store.updateUser(body)
    } else {
      await store.createUser({ name, age })
    }
    await reloadUsers()
    resetForm()
  })
}
// delete
function onDelete(u: User) {
  askConfirm(t('confirmDelete') as string, async () => {
    await store.deleteUser(u.id)
    await reloadUsers()
  })
}
</script>

<template>
  <div class="page">
    <!-- 頁首與語言切換 -->
    <header class="header">
      <h1 class="title">{{ $t('title') }}</h1>
      <nav class="lang">
        <NuxtLink :to="switchLocalePath('en-US')">EN</NuxtLink>
        <span>·</span>
        <NuxtLink :to="switchLocalePath('zh-TW')">繁中</NuxtLink>
      </nav>
    </header>

    <!-- 操作區 -->
    <section class="card">
      <h2 class="card__title">{{ $t('operation') }}</h2>

      <ETextField
        v-model="form.name"
        :label="$t('name')"
        :error="errors.name"
        :placeholder="$t('placeholderName')"
      />
      <ETextField
        v-model.number="form.age"
        :label="$t('age')"
        type="number"
        :error="errors.age"
        :placeholder="$t('placeholderAge')"
      />

      <div class="actions">
        <template v-if="editing">
          <EBtn color="success" :text="$t('update')" @click="submit" />
          <EBtn color="warn" :text="$t('cancel')" @click="resetForm" />
        </template>
        <template v-else>
          <EBtn color="success" :text="$t('create')" @click="submit" />
        </template>
      </div>
    </section>

    <!-- 列表區 -->
    <section class="card">
      <h2 class="card__title">{{ $t('list') }}</h2>
      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th class="col--idx">#</th>
              <th class="col--text">{{ $t('name') }}</th>
              <th class="col--text">{{ $t('age') }}</th>
              <th class="col--op">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!list.length">
              <td colspan="4" class="empty">{{ $t('noData') }}</td>
            </tr>

            <tr v-for="(u, idx) in list" :key="u.id">
              <td class="col--idx" :data-label="'#'">{{ idx + 1 }}</td>
              <td class="col--text" :data-label="$t('name')">{{ u.name }}</td>
              <td class="col--text" :data-label="$t('age')">{{ u.age }}</td>
              <td class="col--op" :data-label="$t('actions')">
                <EBtn class="listBtn" color="success" :text="$t('update')" @click="fillForm(u)" />
                <EBtn class="listBtn" color="error" :text="$t('delete')" @click="onDelete(u)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <ConfirmDialog v-model="showConfirm" :message="confirmMessage" @confirm="onConfirm" />
  </div>
</template>

<style scoped lang="scss">
.page {
  width: 100%;
  padding: 16px;
  background: #1f1f1f;
  color: #eee;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title {
  font-size: 20px;
  font-weight: 700;
}
.lang a {
  color: #ddd;
  text-decoration: underline;
}
.lang span {
  margin: 0 0.5rem;
  color: #666;
}

.card {
  border: 1px solid #3a3a3a;
  border-radius: 16px;
  padding: 20px;
  background: #2a2a2a;
  max-width: 960px;
  width: 100%;
  // margin: 0 auto;

  .listBtn {
    margin-left: 1%;
  }
}
.card__title {
  text-align: center;
  font-weight: 700;
  margin-bottom: 16px;
}

.card > .etf,
.form-wrap,
.actions {
  max-width: 420px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 12px;
}

.table-wrap {
  overflow-x: auto;
}
.table {
  width: 100%;
  min-width: 520px;
  border-collapse: collapse;
}
.table th,
.table td {
  padding: 10px 12px;
  border-bottom: 1px solid #3a3a3a;
}
.table thead tr {
  background: #232323;
}
.col--idx {
  text-align: center;
  width: 64px;
}
.col--op {
  text-align: center;
  width: 180px;
}
.col--text {
  text-align: left;
}
.empty {
  text-align: center;
  padding: 20px;
  color: #aaa;
}

@media (max-width: 992px) {
  .card {
    max-width: 720px;
  }
}

@media (max-width: 480px) {
  .card {
    padding: 16px;
  }
  .table {
    min-width: 0;
    width: 100%;
  }

  .table thead {
    display: none;
  }
  .table tbody {
    display: grid;
    gap: 12px;
  }

  .table tr {
    display: grid;
    gap: 6px;
    border: 1px solid #3a3a3a;
    border-radius: 12px;
    padding: 10px;
    background: #262626;
  }
  .table td {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 0;
    padding: 4px 2px;
  }
  .table td::before {
    content: attr(data-label);
    color: #aaa;
    margin-right: 8px;
  }

  .col--op {
    gap: 8px;
  }
}
</style>
