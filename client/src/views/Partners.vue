<script lang="ts" setup>
import { onMounted, ref } from "vue";
import View from "./View.vue";
import { useFetch } from "../composables/useFetch";
import { Player } from "../types/Player";
import { web_api_uri } from "../constants";
import { VDataTable } from "vuetify/labs/VDataTable"
import { capitalize } from "lodash";
import AddPartnerCode from "../components/modals/partners/AddPartnerCode.vue";
import AddPartner from "../components/modals/partners/AddPartner.vue";

const partners = ref<any[]>()

const showAddCodeModal = ref<boolean>();
const showAddPartnerModal = ref<boolean>();
const addCodeModalUUID = ref<string>();
const date = ref<{ year: number, month: number }>();
const headers = [
  { title: 'Email', key: 'email' },
  { title: 'Uuid', key: 'uuid', sortable: false },
  { title: 'Stripe ID', key: 'partnerStripeId', sortable: false },
  { title: 'Solde', key: 'soldes.total' },
  { title: '', key: 'action', sortable: false, width: 200 },
]

onMounted(() => {
  loadPartners();
})

const getFirstAndLastDayOfMonth = (year: number, month: number) => {
  return {
    first: new Date(year, month, 1),
    last: new Date(year, month + 1, 0)
  }
}

const loadPartners = () => {
  const today = new Date();
  const month = date.value
    ? getFirstAndLastDayOfMonth(date.value.year, date.value.month)
    : getFirstAndLastDayOfMonth(today.getFullYear(), today.getMonth())

  const startAt = month.first.toISOString().slice(0, 10);
  const endAt = month.last.toISOString().slice(0, 10);

  Promise.all([
    useFetch<Player[]>(`/profile/partners`, 'GET', {}, web_api_uri),
    useFetch<any[]>(`/partner_code`, 'GET', {}, web_api_uri),
    useFetch<any>(`/profile/soldes`, 'POST', { data: { startAt, endAt } }, web_api_uri),
  ])
    .then(([playersResponse, codesResponse, soldesResponse]) => {
      const players = playersResponse.data;
      const codes = codesResponse.data;
      const soldes = soldesResponse.data;

      partners.value = players.map(p => ({
        ...p,
        codes: codes.filter(c => c.uuid === p.uuid),
        soldes: soldes[p.uuid] || { total: 0 }
      }));
    });
}

const isCodeActive = (code: any) => {
  return code.status === 'ACTIVE';
}

const toggleCode = (code: any) => {
  const status = isCodeActive(code) ? 'INACTIVE' : 'ACTIVE';
  useFetch(`/partner_code/updateStatus/${code.codeId}`, 'POST', { data: { status } }, web_api_uri)
    .then(() => {
      code.status = status;
    })
}

const openPartnerModal = () => {
  showAddPartnerModal.value = true;
}

const openCodeModal = (partner: any) => {
  addCodeModalUUID.value = partner.uuid;
  showAddCodeModal.value = true;
}

</script>

<template>
  <View>
    <main class="main flex flex-col gap-4">
      <div class="flex justify-end gap-4">
        <Datepicker v-model="date" class="w-1/4" month-picker placeholder="Mois" @update:model-value="loadPartners()"/>
        <v-btn color="primary" variant="outlined" @click="openPartnerModal()"> Ajouter un partenaire</v-btn>
      </div>
      <v-data-table
          :headers="headers"
          :items="partners"
          expand-on-click
          show-expand
      >
        <template v-slot:item.soldes.total="{ item }">
          {{ item.props.value.soldes.total }}€
        </template>
        <template v-slot:expanded-row="{ item }">
          <tr>
            <th class="opacity-70">Code</th>
            <th class="opacity-70">Pourcentage</th>
            <th class="opacity-70">Remise</th>
            <th class="opacity-70">Status</th>
            <th></th>
            <th class="flex justify-center">
              <v-btn color="primary" variant="text" @click="openCodeModal(item.value)">
                Ajouter
              </v-btn>
            </th>
            <th></th>
          </tr>
          <tr v-for="code in item.value.codes" :key="code.codeId">
            <td>{{ code.codeId }}</td>
            <td>{{ code.percentage }}%</td>
            <td>{{ code.discount }}%</td>
            <td>
              <v-chip :color="isCodeActive(code) ? 'green' : 'red'">
                {{ capitalize(code.status) }}
              </v-chip>
            </td>
            <td></td>
            <td class="flex flex-col items-center">
              <v-switch
                  :model-value="isCodeActive(code)"
                  color="primary"
                  @click="toggleCode(code)"></v-switch>
            </td>
            <td></td>
          </tr>
        </template>
      </v-data-table>
    </main>
  </View>
  <AddPartnerCode v-model="showAddCodeModal" :uuid="addCodeModalUUID" @partner-code:added="loadPartners"/>
  <AddPartner v-model="showAddPartnerModal" @partner:added="loadPartners"/>
</template>