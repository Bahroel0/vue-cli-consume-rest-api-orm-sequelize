<template>
  <v-dialog v-model="visibility" width="400">
    <v-card>
      <v-card-title>
        Form {{ isEdit ? 'Update' : 'New'}} Company
      </v-card-title>
      <v-card-text>
        <v-form ref="form_company">
          <v-text-field
            v-model="name"
            :rules="[v => !!v || 'This field is required']"
            label="Name"
            outlined
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn class="primary" :loading="btnLoading" @click="isEdit ? update() : submit()">{{ isEdit ? 'Update' : 'Save'}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    company: {
      type: Object,
      default: null
    },
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      name: null,
      visibility: false,
      btnLoading: false
    }
  },
  computed: {
    isEdit(){
      return this.company !== null
    }
  },
  watch: {
    dialog(v){
      this.visibility = v
    },
    company(v){
      this.name = v.name
    },
    visibility(v){
      if(!v){
        this.$refs.form_company.reset()
        this.$emit('close')
      }
    }
  },
  methods: {
    submit(){
      if(this.$refs.form_company.validate()){
        this.btnLoading = true
        axios.post(process.env.VUE_APP_API_URL + '/company', {name: this.name}).then(res => {
          if(res.data){
            this.$emit('refresh')
            this.visibility = false
            this.btnLoading = false
          }
        })
      }
    },
    update(){
      if(this.$refs.form_company.validate()){
        this.btnLoading = true
        axios.put(process.env.VUE_APP_API_URL + '/company/'+ this.company.id, {name: this.name}).then(res => {
          if(res.data){
            this.$emit('refresh')
            this.visibility = false
            this.btnLoading = false
          }
        })
      }
    }
  }
}
</script>