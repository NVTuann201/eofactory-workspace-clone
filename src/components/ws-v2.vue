<template>
  <div>
    <v-app-bar elevation="2" class="header">
      <div class="header-logo">
        <v-img src="https://cdn.eofactory.ai/unsafe/0x45/https://eofactory.ai/images/logo/EOfactory-logo.png?ver=1.0.0" class="img-logo"></v-img>
      </div>
      <v-spacer></v-spacer>
      <div class="header-menu d-flex align-center">
        <v-text-field class="search-field" density="compact" prepend-inner-icon="mdi-magnify" hide-details placeholder="Search..." variant="outlined"></v-text-field>
        <div class="eotoken">
          <span>EOToken: </span>
          <span class="text-red font-weight-medium">250</span>
        </div>
        <v-divider vertical class="divider" length="32" thickness="2"></v-divider>
        <div class="icons">
          <v-icon class="mr-2">mdi-help-circle-outline</v-icon>
          <v-icon>mdi-bell-outline</v-icon>
        </div>
        <v-divider vertical class="divider mr-4" length="28" thickness="2"></v-divider>
        <div class="choose-region">
          <v-select
            borderless
            v-model="selectRegion"
            class="select"
            density="compact"
            variant="plain"
            hide-details
            single-line
            :items="regions"
          ></v-select>
        </div>
        <v-divider vertical class="divider" length="28" thickness="2"></v-divider>
        <div class="profile">
          <v-avatar image="https://lh3.googleusercontent.com/a/ALm5wu3_g6o79_szeeOwIYEYlOMKkD-9DheO-AwAmnk3=s96-c"></v-avatar>
          <span class="name">trien nguyen</span>
        </div>
      </div>
    </v-app-bar>

    <div class="content">
      <div class="container">
        <div class="recent-workspace">
            <div class="header">
              <span>Recent workspaces</span>
            </div>
            <div class="ws-recents">
              <v-row>
                <v-col cols="12" md="3">
                  <v-card v-for="i in 4" :key="i" class="block-ws-recent">
                    <v-card-text>
                      <div class="text">
                        This is some sample text.
                      </div>
                      <div class="btn-block">
                        <v-menu>
                          <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" icon="mdi-dots-vertical" variant="plain" density="comfortable"></v-btn>
                          </template>
                          <v-list>
                            <v-list-item class="btn-list-item">
                              <v-list-item-title @click="delelteWs" class="delete">Delete
                              </v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </div>
                    </v-card-text>

                  </v-card>
                </v-col>
              </v-row>
            </div>
        </div>
        <div class="all-workspace">
          <div class="header-menu">
            <div class="sort">
              <span>Sort By: </span>
              <span>Sort By: </span>
              <span>Sort By: </span>
              <span>Sort By: </span>
            </div>
            <div class="search">
              <v-text-field></v-text-field>
            </div>
          </div>
          <div class="full-workspace"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectRegion: 'Asia',
      regions: ['Europe', 'Asia', 'USA'],
      menuWs: true
    }
  },
  methods: {
    delelteWs() {

    }
  }
}
</script>
<style lang="scss">
.header {
  padding: 0 16px;
}
::v-deep .v-toolbar__content {
  height: 70px !important;
}
.img-logo {
  height: 45px;
  width: 105px;
}
.search-field {
  width: 600px;
  padding: 0 12px;
  height: 44px;
  margin: 0 64px;
}
::v-deep .v-field__input {
  min-height: 44px;
}
.eotoken {
  margin-right: 34px;
}
.divider {
  margin: 10px 0;
  color: #333;
}
.icons {
  margin: 0 28px;
}
.choose-region {
  width: 134px;
}
.select .v-field__input {
  padding-top: 6px !important;
}
.profile {
  padding: 0 20px;
  .name {
    font-size: 20px;
    font-weight: 400;
    margin-left: 8px;
  }
}
.btn-block {
  position: absolute;
  top: 10px;
  right:  0px;
}
.btn-list-item:hover{
  background-color: #e7e7e7 !important;
}
.block-ws-recent {
  height: 100%;
}
.delete {
  cursor: pointer;
}
.content {
  padding: 12px;
  width: 100%;
  .container {
    width: 100%;
    padding: 28px 8px 8px 8px;
    .recent-workspace {
      width: 100%;
      .header {
        width: 100%;
        padding: 12px;
      }
      .ws-recents {
        width: 100%;
        .block-ws-recent {
          margin: 12px !important;
          width: 316px;
          height: 200px !important;
        }
      }
    }
  }
}
</style>
