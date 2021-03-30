<template>
  <c4-page medium
    header-type="2"
    :dense="true"
  >
    <v-container
      fluid
      slot="page-header-content"
    >
      <h1 class="display-1 white--text" style="margin-top: -24px;">Header</h1>
    </v-container>
    <v-container fluid>
      <v-card tile>
        <v-card-title>
          <h2>Card Title</h2>
        </v-card-title>
        <v-card-text>
          Card Content
        </v-card-text>
      </v-card>
    </v-container>
  </c4-page>
</template>

<script>

export default {
  name: 'Home'
}
</script>
