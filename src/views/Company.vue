<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>
            Company
            <v-spacer />
            <v-text-field
              v-model="search"
              class="mr-5"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              outlined
            />
            <v-btn class="primary ml-3" large @click="dialogForm = true">
              <v-icon left>mdi-plus</v-icon>
              Add Data
            </v-btn>
            <Form :company="item" :dialog="dialogForm" @close="dialogForm = false" @refresh="load" />
          </v-card-title>
          <v-card-text>
            
            <v-data-table
              :headers="headers"
              :items="companies"
              :search="search"
            >
              <template v-slot:[`item.action`]="{ item }">
                <v-btn small dark class="text-none green mx-1" @click="update(item)">
                  <v-icon small left>mdi-pencil</v-icon>
                  Edit
                </v-btn>
                <v-btn small class="text-none error mx-1" @click="remove(item)">
                  <v-icon small left>mdi-delete</v-icon>
                  Hapus
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios"
import Form from "@/components/FormCompany"
export default {
  components: {
    Form
  },
  data(){
    return {
      dialogForm:false,
      item: null,
      search: null,
      headers: [
        {
          text: 'ID',
          align: 'start',
          filterable: false,
          value: 'id',
        },
        {
          text: 'Name',
          align: 'start',
          filterable: false,
          value: 'name',
        },
        {
          text: 'Created At',
          align: 'start',
          filterable: false,
          value: 'createdAt',
        },
        {
          text: 'Updated At',
          align: 'start',
          filterable: false,
          value: 'updatedAt',
        },
        {
          text: 'Actions',
          align: 'start',
          filterable: false,
          value: 'action',
        },
      ],
      companies: []
    }
  },
  created(){
    this.load()
  },
  methods: {
    load(){
      axios.get(process.env.VUE_APP_API_URL + '/company').then(res => {
        this.companies = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    update(item) {
      this.item = item
      this.dialogForm  = true
    },
    remove(item) {
      axios.delete(process.env.VUE_APP_API_URL + '/company/' + item.id ).then(() => {
          this.load()
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>