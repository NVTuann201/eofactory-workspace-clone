<template>
  <div>
    <v-app-bar elevation="2" class="header">
      <div class="header-logo">
        <v-img
          src="https://cdn.eofactory.ai/unsafe/0x45/https://eofactory.ai/images/logo/EOfactory-logo.png?ver=1.0.0"
          class="img-logo"
        ></v-img>
      </div>
      <v-spacer></v-spacer>
      <div class="header-menu d-flex align-center">
        <v-text-field
          class="search-field"
          density="compact"
          prepend-inner-icon="mdi-magnify"
          hide-details
          placeholder="Search..."
          variant="outlined"
        ></v-text-field>
        <div class="eotoken">
          <span>EOToken: </span>
          <span class="text-red font-weight-medium">250</span>
        </div>
        <v-divider
          vertical
          class="divider"
          length="32"
          thickness="2"
        ></v-divider>
        <div class="icons">
          <v-icon class="mr-2">mdi-help-circle-outline</v-icon>
          <v-icon>mdi-bell-outline</v-icon>
        </div>
        <v-divider
          vertical
          class="divider mr-4"
          length="28"
          thickness="2"
        ></v-divider>
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
            item-title="name"
            item-value="code"
            @change="reloadRegion"
          ></v-select>
        </div>
        <v-divider
          vertical
          class="divider"
          length="28"
          thickness="2"
        ></v-divider>
        <div class="profile">
          <v-avatar
            image="https://lh3.googleusercontent.com/a/ALm5wu3_g6o79_szeeOwIYEYlOMKkD-9DheO-AwAmnk3=s96-c"
          ></v-avatar>
          <span class="name">trien nguyen</span>
        </div>
      </div>
    </v-app-bar>

    <div class="workspaces d-flex justify-center">
      <div class="workspace pa-10">
        <div class="recent-workspace">
          <div class="header mb-4">
            <span>Recent Workspaces</span>
          </div>
          <div class="recent-content mt-6">
            <v-row>
              <v-col
                cols="12"
                lg="3"
                md="4"
                sm="6"
                v-for="(ws, index) in RecentWorkspaces"
                :key="index"
              >
                <div class="block-workspace">
                  <v-card class="block-ws">
                    <v-card-text>
                      <div class="title">{{ ws.name }}</div>
                      <div class="date">{{ ws.created_at }}</div>
                      <div class="total-items">{{ ws.total_items }} data items</div>
                      <div class="owner">Owner: {{ ws.owner.name }}</div>
                      <div class="size">Size: {{ ws.size_mb }}</div>
                      <div class="backgroud">
                        <svg data-v-8983b300="" preserveAspectRatio="none" width="222" height="119" viewBox="0 0 222 119" fill="none" xmlns="http://www.w3.org/2000/svg" class="padding-icon">
                          <mask data-v-8983b300="" id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="222" height="119">
                            <rect data-v-8983b300="" y="3" width="222" height="119" rx="5" fill="white"></rect>
                          </mask>
                          <g data-v-8983b300="" mask="url(#mask0)">
                            <path data-v-8983b300="" opacity="0.1" d="M192 25.6154C207.6 19.6154 219.5 18.4488 223.5 18.6154L259 108.115C222.167 141.615 146.4 192.815 138 129.615C127.5 50.6155 172.5 33.1154 192 25.6154Z" :fill="ws.color"></path>
                            <path data-v-8983b300="" opacity="0.1" d="M243.312 54.8112C257.119 64.2312 264.846 73.3562 266.983 76.7413L213.552 156.838C193.834 152.266 63.4263 133.913 44.5 121.615C101.5 116.115 101 96.6151 133.5 56.6154C173.313 7.61523 226.054 43.0363 243.312 54.8112Z" :fill="ws.color"></path>
                            <path data-v-8983b300="" opacity="0.1" d="M139.5 88.1155C200.7 87.7155 253.333 108.616 272 119.116L17 124.615C32.3333 112.615 78.3 88.5155 139.5 88.1155Z" :fill="ws.color"></path>
                            <circle data-v-8983b300="" opacity="0.1" cx="213" cy="86.6152" r="38.5" :fill="ws.color"></circle>
                          </g>
                        </svg>
                      </div>
                      <div class="btn-block">
                        <v-menu>
                          <template v-slot:activator="{ props }">
                            <v-btn
                              v-bind="props"
                              icon="mdi-dots-vertical"
                              variant="plain"
                              density="comfortable"
                            ></v-btn>
                          </template>
                          <v-list>
                            <v-list-item class="btn-list-item">
                              <v-list-item-title
                                @click="delelteWs"
                                class="delete"
                                >Delete
                              </v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </div>
                      <div class="btn-share">
                        <svg v-if="ws.user_shared.length > 0" data-v-8983b300="" width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" id="workspace_item_publicIcon_1_recent">
                          <circle data-v-8983b300="" cx="16.563" cy="16.472" r="16.0834" fill="white"></circle>
                          <path data-v-8983b300="" d="M19.1624 18.4961C20.3637 19.1394 22.4019 21.0238 22.4116 23.6969C21.2886 24.2875 19.2915 25.3749 16.6328 25.3172C13.9741 25.2596 11.5825 24.1002 10.7144 23.6969C10.7144 22.6744 10.679 20.4044 13.9636 18.4961" stroke="#1a81ba" stroke-width="1.46215" stroke-linecap="round" stroke-linejoin="round"></path>
                          <path data-v-8983b300="" d="M24.036 19.1823C25.451 18.8298 26.5536 18.2342 27.2852 17.8494C27.2762 15.3602 25.5082 13.5549 24.2949 12.7988" stroke="#1a81ba" stroke-width="1.46215" stroke-linecap="round" stroke-linejoin="round"></path>
                          <path data-v-8983b300="" d="M9.08997 19.1823C7.67504 18.8298 6.57239 18.2342 5.84076 17.8494C5.8498 15.3602 7.6178 13.5549 8.83109 12.7988" stroke="#1a81ba" stroke-width="1.46215" stroke-linecap="round" stroke-linejoin="round"></path>
                          <path data-v-8983b300="" d="M19.731 15.5709C19.731 16.7582 19.2966 18.0841 18.6333 19.1068C17.9438 20.1699 17.1602 20.6884 16.563 20.6884C15.9657 20.6884 15.1822 20.1699 14.4927 19.1068C13.8294 18.0841 13.395 16.7582 13.395 15.5709C13.395 14.4162 13.8036 13.6494 14.3606 13.1624C14.9334 12.6615 15.7265 12.4029 16.563 12.4029C17.3995 12.4029 18.1926 12.6615 18.7654 13.1624C19.3224 13.6494 19.731 14.4162 19.731 15.5709Z" stroke="#1a81ba" stroke-width="1.46215"></path>
                          <path data-v-8983b300="" d="M18.5658 10.2103C18.8405 8.5341 20.1339 7.77344 21.4368 7.77344C22.9051 7.77344 24.3611 8.73929 24.3611 10.8927C24.3611 12.5605 23.4876 14.4516 22.4116 15.2196" stroke="#1a81ba" stroke-width="1.46215" stroke-linecap="round"></path>
                          <path data-v-8983b300="" d="M14.5602 10.2103C14.2855 8.5341 12.9921 7.77344 11.6891 7.77344C10.2209 7.77344 8.76485 8.73929 8.76485 10.8927C8.76485 12.5605 9.63833 14.4516 10.7144 15.2196" stroke="#1a81ba" stroke-width="1.46215" stroke-linecap="round"></path>
                        </svg>
                        <svg v-else data-v-8983b300="" width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" id="workspace_item_privateIcon_0_recent">
                          <circle data-v-8983b300="" cx="16.7371" cy="16.472" r="16.0834" fill="white"></circle>
                          <path data-v-8983b300="" d="M20.0728 16.2617C21.6145 16.9693 24.2299 19.042 24.2424 21.9823C22.8013 22.6318 20.2386 23.8279 16.8268 23.7645C13.415 23.7011 10.3459 22.4259 9.23198 21.9823C9.23198 20.8575 9.18651 18.3608 13.4015 16.2617" stroke="#006EC5" stroke-width="1.50104" stroke-linecap="round" stroke-linejoin="round"></path>
                          <path data-v-8983b300="" d="M20.573 12.0933C20.573 13.6721 20.0456 15.4173 19.2487 16.7577C18.8517 17.4254 18.4049 17.9638 17.954 18.3273C17.5011 18.6926 17.088 18.848 16.737 18.848C16.3861 18.848 15.973 18.6926 15.52 18.3273C15.0691 17.9638 14.6223 17.4254 14.2253 16.7577C13.4284 15.4173 12.901 13.6721 12.901 12.0933C12.901 10.5409 13.4087 9.49705 14.0982 8.83936C14.7976 8.17226 15.7494 7.84036 16.737 7.84036C17.7247 7.84036 18.6764 8.17226 19.3758 8.83936C20.0654 9.49705 20.573 10.5409 20.573 12.0933Z" stroke="#006EC5" stroke-width="1.50104"></path>
                        </svg>
                      </div>
                    </v-card-text>
                  </v-card>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>

        <div class="main-workspace mt-10">
          <div class="header-choose mb-10 d-flex justify-space-between">
            <div class="orderby">
              <span>Order By: </span>
              <v-btn class="btn-order" variant="plain">Date</v-btn>
              <v-btn class="btn-order" variant="plain">Name</v-btn>
              <v-btn class="btn-order" variant="plain">Size</v-btn>
            </div>
            <div class="search">
              <v-text-field
                density="compact"
                class="search-input-text mr-4"
                append-inner-icon="mdi-magnify"
                placeholder="Search"
                hide-details
              ></v-text-field>
            </div>
          </div>
          <div class="all-ws">
            <v-row>
              <v-col
                cols="12"
                lg="3"
                md="4"
                sm="6"
              >
                <v-btn width="316px" height="200px">
                  <div class="d-flex flex-column align-center">
                    <svg data-v-aaf76ee2="" width="80" height="62" viewBox="0 0 80 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g data-v-aaf76ee2="" clip-path="url(#clip0)">
                        <path data-v-aaf76ee2="" d="M25.4692 1.07873L7.06827 1.13167C6.67957 1.1328 6.29557 1.21648 5.9418 1.37715C5.58802 1.53782 5.27259 1.7718 5.01646 2.06354C4.76034 2.35527 4.56939 2.69807 4.45632 3.06915C4.34325 3.44022 4.31064 3.83107 4.36067 4.2157L9.05852 40.4838C9.14364 41.1437 9.4674 41.7499 9.96893 42.1884C10.4705 42.6269 11.1152 42.8675 11.782 42.865L68.5752 42.697C69.2418 42.6951 69.8846 42.4505 70.3832 42.0091C70.8817 41.5676 71.2015 40.9598 71.2826 40.2997L75.0258 9.01343C75.0563 8.7572 75.032 8.49741 74.9542 8.25129C74.8765 8.00517 74.7473 7.77834 74.575 7.58585C74.4028 7.39335 74.1915 7.23959 73.9552 7.13474C73.7189 7.0299 73.463 6.97637 73.2044 6.97771L29.9249 7.10208L28.4095 2.80105C28.1203 2.2763 27.6945 1.83926 27.1769 1.53609C26.6593 1.23292 26.0693 1.07491 25.4692 1.07873Z" fill="#BDBDBD"></path>
                        <path data-v-aaf76ee2="" d="M25.4817 1.95601L7.0694 1.99731C6.67995 1.9982 6.29519 2.08206 5.94085 2.24327C5.58651 2.40448 5.27075 2.63933 5.01469 2.93211C4.75864 3.22489 4.56819 3.56885 4.45608 3.94099C4.34397 4.31313 4.31278 4.70487 4.36461 5.09001L8.03872 41.3636L72.3103 41.1714L75.0297 9.89063C75.0598 9.63473 75.0351 9.37537 74.9574 9.12966C74.8797 8.88395 74.7506 8.65747 74.5788 8.46513C74.407 8.27278 74.1963 8.11896 73.9605 8.01378C73.7248 7.9086 73.4694 7.85446 73.2112 7.85493L29.9289 7.96774L28.4106 3.67534C28.1219 3.15287 27.6977 2.71755 27.1824 2.41503C26.667 2.11252 26.0796 1.95396 25.4817 1.95601Z" fill="#E0E0E0"></path>
                        <path data-v-aaf76ee2="" d="M71.1686 59.3371L9.16709 59.5232C8.43765 59.5278 7.73171 59.266 7.1824 58.7871C6.63309 58.3081 6.2784 57.6452 6.18521 56.9233L1.06529 17.3275C1.01111 16.908 1.04694 16.4818 1.17039 16.0772C1.29383 15.6726 1.50209 15.2988 1.78133 14.9806C2.06058 14.6625 2.40443 14.4072 2.79008 14.2317C3.17574 14.0562 3.59438 13.9646 4.01824 13.9628L76.0255 13.7486C76.4496 13.7476 76.869 13.8365 77.256 14.0096C77.643 14.1826 77.9886 14.4359 78.27 14.7524C78.5514 15.069 78.7621 15.4416 78.8881 15.8456C79.0141 16.2497 79.0526 16.6758 79.0009 17.0958L74.1237 56.7198C74.035 57.4403 73.6859 58.1038 73.1418 58.5857C72.5977 59.0676 71.8961 59.3348 71.1686 59.3371Z" fill="#BDBDBD"></path>
                        <path data-v-aaf76ee2="" d="M71.1696 60.2115L9.16813 60.3975C8.44069 60.3994 7.73758 60.1363 7.1907 59.6576C6.64383 59.179 6.29079 58.5177 6.19782 57.7978L1.06631 18.2047C1.0121 17.785 1.048 17.3586 1.17163 16.9538C1.29525 16.549 1.50376 16.175 1.78332 15.8568C2.06287 15.5386 2.40708 15.2834 2.79308 15.1081C3.17908 14.9328 3.59805 14.8414 4.02215 14.8401L76.0294 14.6259C76.4533 14.6244 76.8727 14.713 77.2597 14.8857C77.6467 15.0584 77.9924 15.3114 78.2738 15.6277C78.5552 15.9441 78.766 16.3165 78.892 16.7204C79.0181 17.1243 79.0565 17.5503 79.0048 17.9702L74.1363 57.5943C74.0473 58.3167 73.6965 58.9818 73.15 59.4639C72.6035 59.946 71.8991 60.2119 71.1696 60.2115Z" fill="#E0E0E0"></path>
                        <circle data-v-aaf76ee2="" cx="40.8603" cy="37.6733" r="13" transform="rotate(0.5 40.8603 37.6733)" fill="white"></circle>
                        <rect data-v-aaf76ee2="" x="39.9127" y="31.6648" width="2" height="12" rx="1" transform="rotate(0.5 39.9127 31.6648)" fill="#006EC5"></rect>
                        <rect data-v-aaf76ee2="" x="46.8688" y="36.7257" width="2" height="12" rx="1" transform="rotate(90.5 46.8688 36.7257)" fill="#006EC5"></rect>
                      </g>
                      <defs data-v-aaf76ee2="">
                        <clipPath data-v-aaf76ee2="" id="clip0">
                          <rect data-v-aaf76ee2="" width="78" height="60.3256" fill="white" transform="translate(1.18759) rotate(0.5)"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                    <span class="mt-5 text-h6 font-weight-regular text-uppercase text-primary">new workspace</span>
                  </div>
                </v-btn>
                <!-- <v-card class="block-ws" @click="openDialogAdd">
                  <v-card-text>
                    <div class="add-new-ws">

                    </div>
                  </v-card-text>
                </v-card> -->
              </v-col>
              <v-col
                cols="12"
                lg="3"
                md="4"
                sm="6"
                v-for="(ws, index) in Workspaces"
                :key="index"
              >
                <div class="block-workspace">
                  <v-card class="block-ws">
                    <v-card-text>
                      <div class="title">{{ ws.name }}</div>
                      <div class="date">{{ ws.created_at }}</div>
                      <div class="total-items">{{ ws.total_items }} data items</div>
                      <div class="owner">Owner: {{ ws.owner.name }}</div>
                      <div class="size">Size: {{ ws.size_mb }}</div>
                      <div class="backgroud">
                        <svg data-v-8983b300="" preserveAspectRatio="none" width="222" height="119" viewBox="0 0 222 119" fill="none" xmlns="http://www.w3.org/2000/svg" class="padding-icon">
                          <mask data-v-8983b300="" id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="222" height="119">
                            <rect data-v-8983b300="" y="3" width="222" height="119" rx="5" fill="white"></rect>
                          </mask>
                          <g data-v-8983b300="" mask="url(#mask0)">
                            <path data-v-8983b300="" opacity="0.1" d="M192 25.6154C207.6 19.6154 219.5 18.4488 223.5 18.6154L259 108.115C222.167 141.615 146.4 192.815 138 129.615C127.5 50.6155 172.5 33.1154 192 25.6154Z" :fill="ws.color"></path>
                            <path data-v-8983b300="" opacity="0.1" d="M243.312 54.8112C257.119 64.2312 264.846 73.3562 266.983 76.7413L213.552 156.838C193.834 152.266 63.4263 133.913 44.5 121.615C101.5 116.115 101 96.6151 133.5 56.6154C173.313 7.61523 226.054 43.0363 243.312 54.8112Z" :fill="ws.color"></path>
                            <path data-v-8983b300="" opacity="0.1" d="M139.5 88.1155C200.7 87.7155 253.333 108.616 272 119.116L17 124.615C32.3333 112.615 78.3 88.5155 139.5 88.1155Z" :fill="ws.color"></path>
                            <circle data-v-8983b300="" opacity="0.1" cx="213" cy="86.6152" r="38.5" :fill="ws.color"></circle>
                          </g>
                        </svg>
                      </div>
                      <div class="btn-block">
                        <v-menu>
                          <template v-slot:activator="{ props }">
                            <v-btn
                              v-bind="props"
                              icon="mdi-dots-vertical"
                              variant="plain"
                              density="comfortable"
                            ></v-btn>
                          </template>
                          <v-list>
                            <v-list-item class="btn-list-item">
                              <v-list-item-title
                                @click="delelteWs"
                                class="delete"
                                >Delete
                              </v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </div>
                      <div class="btn-share">
                        <svg v-if="ws.user_shared.length > 0" data-v-8983b300="" width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" id="workspace_item_publicIcon_1_recent">
                          <circle data-v-8983b300="" cx="16.563" cy="16.472" r="16.0834" fill="white"></circle>
                          <path data-v-8983b300="" d="M19.1624 18.4961C20.3637 19.1394 22.4019 21.0238 22.4116 23.6969C21.2886 24.2875 19.2915 25.3749 16.6328 25.3172C13.9741 25.2596 11.5825 24.1002 10.7144 23.6969C10.7144 22.6744 10.679 20.4044 13.9636 18.4961" stroke="#1a81ba" stroke-width="1.46215" stroke-linecap="round" stroke-linejoin="round"></path>
                          <path data-v-8983b300="" d="M24.036 19.1823C25.451 18.8298 26.5536 18.2342 27.2852 17.8494C27.2762 15.3602 25.5082 13.5549 24.2949 12.7988" stroke="#1a81ba" stroke-width="1.46215" stroke-linecap="round" stroke-linejoin="round"></path>
                          <path data-v-8983b300="" d="M9.08997 19.1823C7.67504 18.8298 6.57239 18.2342 5.84076 17.8494C5.8498 15.3602 7.6178 13.5549 8.83109 12.7988" stroke="#1a81ba" stroke-width="1.46215" stroke-linecap="round" stroke-linejoin="round"></path>
                          <path data-v-8983b300="" d="M19.731 15.5709C19.731 16.7582 19.2966 18.0841 18.6333 19.1068C17.9438 20.1699 17.1602 20.6884 16.563 20.6884C15.9657 20.6884 15.1822 20.1699 14.4927 19.1068C13.8294 18.0841 13.395 16.7582 13.395 15.5709C13.395 14.4162 13.8036 13.6494 14.3606 13.1624C14.9334 12.6615 15.7265 12.4029 16.563 12.4029C17.3995 12.4029 18.1926 12.6615 18.7654 13.1624C19.3224 13.6494 19.731 14.4162 19.731 15.5709Z" stroke="#1a81ba" stroke-width="1.46215"></path>
                          <path data-v-8983b300="" d="M18.5658 10.2103C18.8405 8.5341 20.1339 7.77344 21.4368 7.77344C22.9051 7.77344 24.3611 8.73929 24.3611 10.8927C24.3611 12.5605 23.4876 14.4516 22.4116 15.2196" stroke="#1a81ba" stroke-width="1.46215" stroke-linecap="round"></path>
                          <path data-v-8983b300="" d="M14.5602 10.2103C14.2855 8.5341 12.9921 7.77344 11.6891 7.77344C10.2209 7.77344 8.76485 8.73929 8.76485 10.8927C8.76485 12.5605 9.63833 14.4516 10.7144 15.2196" stroke="#1a81ba" stroke-width="1.46215" stroke-linecap="round"></path>
                        </svg>
                        <svg v-else data-v-8983b300="" width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" id="workspace_item_privateIcon_0_recent">
                          <circle data-v-8983b300="" cx="16.7371" cy="16.472" r="16.0834" fill="white"></circle>
                          <path data-v-8983b300="" d="M20.0728 16.2617C21.6145 16.9693 24.2299 19.042 24.2424 21.9823C22.8013 22.6318 20.2386 23.8279 16.8268 23.7645C13.415 23.7011 10.3459 22.4259 9.23198 21.9823C9.23198 20.8575 9.18651 18.3608 13.4015 16.2617" stroke="#006EC5" stroke-width="1.50104" stroke-linecap="round" stroke-linejoin="round"></path>
                          <path data-v-8983b300="" d="M20.573 12.0933C20.573 13.6721 20.0456 15.4173 19.2487 16.7577C18.8517 17.4254 18.4049 17.9638 17.954 18.3273C17.5011 18.6926 17.088 18.848 16.737 18.848C16.3861 18.848 15.973 18.6926 15.52 18.3273C15.0691 17.9638 14.6223 17.4254 14.2253 16.7577C13.4284 15.4173 12.901 13.6721 12.901 12.0933C12.901 10.5409 13.4087 9.49705 14.0982 8.83936C14.7976 8.17226 15.7494 7.84036 16.737 7.84036C17.7247 7.84036 18.6764 8.17226 19.3758 8.83936C20.0654 9.49705 20.573 10.5409 20.573 12.0933Z" stroke="#006EC5" stroke-width="1.50104"></path>
                        </svg>
                      </div>
                    </v-card-text>
                  </v-card>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      select: "Asia",
      workspaces: "",
      recentWorkspaces: "",
      selectRegion: "sea",
      regions: [],
      colors: ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(255, 165, 0)', 'rgb(0, 0, 255)', 'rgb(255, 255, 0'],
      token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODExNywibmFtZSI6InRyaWVuIG5ndXllbiIsImVtYWlsIjoidHJpZW4ubnYxOTU5MzRAZ21haWwuY29tIiwiY291bnRyeSI6Ik4vQSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BTG01d3UzX2c2bzc5X3N6ZWVPd0lZRVlsT01La0QtOURoZU8tQXdBbW5rMz1zOTYtYyIsImlhdCI6MTY4NDIzODg5MiwiZXhwIjoxNjg2ODMwODkyfQ.kjrCOTUhvQ9f1_HvNbGXe918dRw9BU0c_8dxg722f7-EFeysMHHRC0v-qUYm6viNrpcndEK6DZ-Ols4KcZS94w'
    };
  },
  computed: {
    Workspaces() {
      const _this = this
      const workspaces = this.workspaces
      const len = this.workspaces.length
      if (len > 0) {
        workspaces.forEach((ws, i) => {
          let index = i % len
          workspaces[i].created_at = _this.handleDate(ws.created_at)
          workspaces[i].size_mb = _this.handleSize(ws.size_mb)
          workspaces[i] = {
            color: _this.colors[index],
            ...ws
          }
        })
      }
      return workspaces
    },
    RecentWorkspaces() {
      const _this = this
      const rW = this.recentWorkspaces
      const len = this.recentWorkspaces.length
      if (len > 0) {
        rW.forEach((ws, i) => {
          let index = i % len
          rW[i].created_at = _this.handleDate(ws.created_at)
          rW[i].size_mb = _this.handleSize(ws.size_mb)
          rW[i] = {
            color: _this.colors[index],
            ...ws
          }
        })
      }
      return rW
    },
    color() {
      return this.colors[0]
    }
  },
  methods: {
    handleDate(date) {
      const arrD = date.split('-')
      return `${arrD[0]}/${arrD[1]}/${arrD[2].substr(0, 2)}`
    },
    handleSize(size) {
      if (size < 1024) {
        return `${size.toFixed(2)} MB`
      } else {
        return `${(size / 1024).toFixed(2)} GB`
      }
    },
    async getWorkspaces() {
      const config = {
        method: "GET",
        url: `https://api-aws.eofactory.ai/api/workspaces?sort=created_at&region=${this.selectRegion}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      };
      const result = await axios(config);
      this.workspaces = result.data.data;
    },
    async getRecentWs() {
      const config = {
        method: "GET",
        url: `https://api-aws.eofactory.ai/api/workspaces/recent?region=${this.selectRegion}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      };
      const result = await axios(config);
      this.recentWorkspaces = result.data.data;
    },
    async getRegions() {
      const config = {
        method: "GET",
        url: `https://api-aws.eofactory.ai/api/regions?region=${this.selectRegion}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      };
      const result = await axios(config);
      this.regions = result.data.data;
    },
    async initData() {
      await this.getWorkspaces()
      await this.getRecentWs()
      await this.getRegions()
    }
  },
  watch: {
    async selectRegion(newVal) {
      await this.initData()
    }
  },
  async mounted() {
    await this.initData()
    console.log("result: ", this.regions[0].name);
  },
};
</script>
<style lang="scss" scoped>
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
.workspace {
  height: calc(100% - 64px);
}
.search-input-text {
  width: 333px;
  background-color: rgb(241, 249, 255);
}
.workspace {
  max-width: 1400px;
}
.block-ws {
  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 4px 0 rgba(0,0,0,0.2);
  }
  width: 316px;
  height: 200px;
  .title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .date {
    color: #999;
    margin-bottom: 10px;
  }
  .total-items {
    font-size: 16px;
    margin-bottom: 20px;
  }
  .owner {
    margin-bottom: 12px;
  }
  .btn-block {
    position: absolute;
    top: 10px;
    right: 0;
  }
  .btn-share {
    position: absolute;
    bottom: 20px;
    right: 10px;
  }
  .backgroud {
    position: absolute;
    bottom: -5px;
    right: 0;
  }
}
.btn-list-item:hover{
  background-color: #e7e7e7 !important;
  cursor: pointer;
}
.btn-order {
  text-transform: none;
}
@media screen and (min-width: 1400px) {
  .workspace {
    min-width: 1400px;
  }
}
@media screen and (max-width: 1399px) {
  .workspace {
    min-width: 1000px;
  }
}
@media screen and (max-width: 1000px) {
  .workspace {
    max-width: 800px;
    min-width: 200px;
  }
}
</style>
