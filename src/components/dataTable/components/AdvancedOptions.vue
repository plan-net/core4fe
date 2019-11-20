<template>
  <v-dialog

    v-model="options"
    max-width="500px"
  >
    <v-card>
      <v-card-title>
        <span>{{translation.advanced_options}}</span>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>

        <v-expansion-panels
          v-model="panel"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header>General</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list>

                <v-list-item>
                  <v-list-item-content>Dense</v-list-item-content>
                  <v-list-item-action>
                    <v-btn-toggle
                      v-model="options.dense"
                      active-class="primary"
                      mandatory
                    >
                      <v-btn
                        small
                        :value="true"
                      >
                        <v-icon small>format_align_justify</v-icon>
                      </v-btn>
                      <v-btn
                        small
                        :value="false"
                      >
                        <v-icon small>format_line_spacing</v-icon>
                      </v-btn>
                    </v-btn-toggle>
                  </v-list-item-action>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item>
                  <v-list-item-content>Maximize</v-list-item-content>
                  <v-list-item-action>
                    <v-btn-toggle
                      v-model="options.fullscreen"
                      active-class="primary"
                      mandatory
                    >
                      <v-btn
                        small
                        :value="true"
                      >
                        <v-icon small>fullscreen</v-icon>
                      </v-btn>
                      <v-btn
                        small
                        :value="false"
                      >
                        <v-icon small>fullscreen_exit</v-icon>
                      </v-btn>
                    </v-btn-toggle>
                  </v-list-item-action>
                </v-list-item>

              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>Table columns</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-simple-table class="px-3 pt-3">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">{{translation.drag_drop_column}}</th>
                      <th class="text-left">{{translation.show}}</th>
                    </tr>
                  </thead>
                  <draggable
                    tag="tbody"
                    :componentData="componentData"
                    :list="options.column"
                    :disabled="!enabled"
                    :animation="100"
                    @start="dragging = true"
                    @end="dragging = false"
                  >
                    <template v-for="element in options.column">
                      <tr
                        v-if="!element.key"
                        :key="element.value"
                      >
                        <td :class="{ unclickable: !element.editable }">
                          <v-btn
                            style="cursor: move"
                            icon
                            class="sortHandle"
                            v-if="element.editable"
                          >
                            <v-icon>drag_indicator</v-icon>
                          </v-btn>
                          <span>{{element.text}}</span>
                        </td>
                        <td>
                          <v-checkbox
                            v-model="element.hide"
                            :true-value="false"
                            :false-value="true"
                            color="primary"
                          ></v-checkbox>
                        </td>
                      </tr>
                    </template>
                  </draggable>
                </template>
              </v-simple-table>
            </v-expansion-panel-content>
          </v-expansion-panel>

        </v-expansion-panels>

      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          text
          small
          @click="reset"
        >Reset options</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          small
          @click="save"
        >
          Save
        </v-btn>
        <v-btn
          color="primary"
          text
          small
          @click="dialog = !dialog"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'advanced-options',
  components: {
    draggable
  },
  props: {
    options: {
      type: Object,
      required: true
    },
    translation: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      panel: [0, 1],
      dialog: true,
      enabled: true,
      dragging: false,
      componentData: {
        props: {
          type: 'transition',
          name: 'flip-list'
        }
      }
    }
  },
  methods: {
    save () {
      // debugger
      this.dialog = !this.dialog
      console.log(this.options)
      this.$emit('saveOptions', this.options)
    },
    reset () {
      this.dialog = !this.dialog
      this.$emit('resetOptions')
    }
  }
}
</script>

<style scoped lang="scss">
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.unclickable {
  pointer-events: none;
}
</style>
