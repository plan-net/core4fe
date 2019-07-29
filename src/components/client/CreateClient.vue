<template>
    <v-dialog v-model="isOpen" lazy max-width="480px">
        <v-card tile>
            <v-toolbar dense card dark color="accent">
                <v-toolbar-title class="ml-0">
                    Add a client
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-text-field autofocus
                              clearable
                              label="Name"
                              v-model="name"
                              required
                              :error-messages="errors.collect('Name')"
                              data-vv-as="Name"
                              data-vv-name="Name"
                              v-validate="'required|min:5|unique'"
                ></v-text-field>
            </v-card-text>
            <v-card-actions class="pr-3 pb-3">
                <v-spacer></v-spacer>
                <v-btn
                        color="primary"
                        @click="_close"
                >
                    Cancel
                </v-btn>
                <v-btn
                        color="primary"
                        @click="save"
                >
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { isUnique } from './helper'
import { Validator } from 'vee-validate'

export default {
  name: 'create-client',
  mounted () {
    Validator.extend('unique', {
      validate: isUnique,
      getMessage: (field, params, data) => data.message
    })
  },
  methods: {
    _close () {
      this.$emit('close')
    },
    save () {
      this.$validator.validate('Name').then(
        async valid => {
          if (valid) {
            console.info('no logic')
          }
        }
      )
    }
  },
  computed: {
    isOpen: {
      get () {
        return this.open
      },
      set () {
        this._close()
      }
    }
  },
  watch: {},
  data () {
    return {
      name: null
    }
  },

  props: {
    open: {
      type: Boolean,
      default: false,
      required: true
    }
  }
}

</script>
