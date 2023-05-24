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
            <div class="orderby d-flex align-center">
              <span class="mr-2">Order By: </span>
              <div class="btn-order d-flex align-center active" variant="text">
                <span>Date</span>
                <div v-if="true" class="d-flex align-center">
                  <!-- <svg data-v-45a1fa08="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sort" style="visibility: visible;"><path data-v-45a1fa08="" d="M7 10L12 15L17 10" stroke="#006EC5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> -->
                  <svg data-v-45a1fa08="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sort360" style="visibility: visible;"><path data-v-45a1fa08="" d="M7 10L12 15L17 10" stroke="#006EC5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
              </div>
              <div class="btn-order" variant="plain">Name</div>
              <div class="btn-order" variant="plain">Size</div>
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
                <v-btn width="316px" height="200px" @click="dialog=true">
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

    <v-dialog
      v-model="dialog"
      width="380"
    >
      <div class="container">
        <div class="btn-close" @click="dialog=false">
          <v-icon>mdi-close</v-icon>
        </div>
        <div class="background"></div>
        <div class="content d-flex align-center flex-column">
          <div class="header-icon">
            <svg data-v-aaf76ee2="" width="71" height="71" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: -35px;"><path data-v-aaf76ee2="" d="M21.6356 16.5152L5.24775 16.7054C4.90158 16.7094 4.56023 16.7869 4.2464 16.9328C3.93257 17.0786 3.65345 17.2895 3.4276 17.5513C3.20176 17.8131 3.03436 18.1199 2.93654 18.4513C2.83872 18.7826 2.81272 19.131 2.86027 19.4732L7.32618 51.7379C7.40712 52.325 7.70018 52.8623 8.15026 53.249C8.60035 53.6356 9.17647 53.8449 9.77032 53.8375L60.3505 53.2464C60.944 53.2396 61.5147 53.0167 61.9553 52.6197C62.3958 52.2227 62.676 51.6788 62.7431 51.0903L65.8337 23.1969C65.8589 22.9685 65.8351 22.7373 65.764 22.5187C65.6929 22.3001 65.576 22.0991 65.4211 21.929C65.2662 21.7589 65.0769 21.6236 64.8656 21.532C64.6543 21.4405 64.426 21.3948 64.1957 21.398L25.6508 21.8451L24.2678 18.0263C24.0061 17.5612 23.6234 17.1753 23.1601 16.9093C22.6968 16.6433 22.1701 16.5072 21.6356 16.5152Z" fill="#DAEEFF"></path> <path data-v-aaf76ee2="" d="M21.6539 17.2965L5.25569 17.4764C4.90885 17.4802 4.56682 17.5579 4.25249 17.7042C3.93816 17.8505 3.65876 18.0622 3.43298 18.3249C3.20721 18.5877 3.04026 18.8955 2.94331 19.2278C2.84635 19.5601 2.82163 19.9092 2.87078 20.2518L6.42496 52.5294L63.6653 51.8587L65.8442 23.9782C65.8689 23.75 65.845 23.5192 65.7738 23.301C65.7027 23.0827 65.586 22.882 65.4315 22.7121C65.277 22.5421 65.0881 22.4067 64.8774 22.3149C64.6666 22.223 64.4387 22.1768 64.2087 22.1792L25.6613 22.6161L24.2757 18.805C24.0146 18.3419 23.6334 17.9575 23.172 17.6921C22.7107 17.4267 22.1863 17.29 21.6539 17.2965Z" fill="#7990A4"></path> <path data-v-aaf76ee2="" d="M32.7676 0.363191L3.46997 5.97156L10.5197 42.638L39.8173 37.0297L32.7676 0.363191Z" fill="white"></path> <g data-v-aaf76ee2="" opacity="0.42" style="mix-blend-mode: multiply;"><path data-v-aaf76ee2="" d="M32.7689 0.363647L32.3207 0.451023L27.6797 36.8481L35.5581 37.8478L39.818 37.0306L32.7689 0.363647Z" fill="#D3E2EC"></path></g> <path data-v-aaf76ee2="" d="M28.0017 4.10266L9.28687 7.68518L9.59548 9.29035L28.3103 5.70783L28.0017 4.10266Z" fill="#D1D2D3"></path> <path data-v-aaf76ee2="" d="M32.1613 25.7109L13.4465 29.2935L13.7552 30.8986L32.4699 27.3161L32.1613 25.7109Z" fill="#D1D2D3"></path> <path data-v-aaf76ee2="" d="M32.7763 28.9395L14.0615 32.522L14.3701 34.1271L33.0849 30.5446L32.7763 28.9395Z" fill="#D1D2D3"></path> <path data-v-aaf76ee2="" d="M33.3979 32.1649L14.6831 35.7474L14.9917 37.3526L33.7065 33.7701L33.3979 32.1649Z" fill="#D1D2D3"></path> <path data-v-aaf76ee2="" d="M23.7857 7.41357L14.4321 9.2041L14.5864 10.0067L23.94 8.21615L23.7857 7.41357Z" fill="#D1D2D3"></path> <path data-v-aaf76ee2="" d="M19.1286 12.5296L8.77588 14.5114L8.93019 15.3139L19.2829 13.3321L19.1286 12.5296Z" fill="#D1D2D3"></path> <path data-v-aaf76ee2="" d="M19.5854 14.9096L9.23267 16.8914L9.38697 17.6939L19.7397 15.7122L19.5854 14.9096Z" fill="#D1D2D3"></path> <path data-v-aaf76ee2="" d="M20.0441 17.2888L9.69141 19.2706L9.84572 20.0732L20.1984 18.0914L20.0441 17.2888Z" fill="#D1D2D3"></path> <path data-v-aaf76ee2="" d="M20.5009 19.6682L10.1482 21.65L10.3025 22.4526L20.6552 20.4708L20.5009 19.6682Z" fill="#D1D2D3"></path> <path data-v-aaf76ee2="" d="M20.9574 22.0482L10.6047 24.03L10.759 24.8326L21.1117 22.8508L20.9574 22.0482Z" fill="#D1D2D3"></path> <path data-v-aaf76ee2="" d="M21.4164 24.4275L11.0637 26.4093L11.218 27.2119L21.5707 25.2301L21.4164 24.4275Z" fill="#D1D2D3"></path> <path data-v-aaf76ee2="" d="M31.6213 10.1389L21.2686 12.1207L21.4229 12.9233L31.7756 10.9415L31.6213 10.1389Z" fill="#D1D2D3"></path> <path data-v-aaf76ee2="" d="M32.0778 12.5188L21.7251 14.5006L21.8794 15.3032L32.2321 13.3214L32.0778 12.5188Z" fill="#D1D2D3"></path> <path data-v-aaf76ee2="" d="M32.5368 14.8957L22.1841 16.8774L22.3384 17.68L32.6911 15.6982L32.5368 14.8957Z" fill="#D1D2D3"></path> <path data-v-aaf76ee2="" d="M32.9933 17.275L22.6406 19.2568L22.7949 20.0594L33.1476 18.0776L32.9933 17.275Z" fill="#D1D2D3"></path> <path data-v-aaf76ee2="" d="M33.4501 19.6547L23.0974 21.6365L23.2517 22.4391L33.6044 20.4573L33.4501 19.6547Z" fill="#D1D2D3"></path> <path data-v-aaf76ee2="" d="M33.9091 22.0343L23.5564 24.0161L23.7107 24.8187L34.0634 22.8369L33.9091 22.0343Z" fill="#D1D2D3"></path> <path data-v-aaf76ee2="" d="M63.4631 3.75654L33.8696 0L29.1477 37.0366L58.7411 40.7932L63.4631 3.75654Z" fill="white"></path> <mask data-v-aaf76ee2="" id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="32" y="0" width="30" height="28"><path data-v-aaf76ee2="" d="M61.7392 4.43749L35.6206 0.771729L32.4131 27.3485L58.5316 26.8903L61.7392 4.43749Z" fill="#C4C4C4"></path></mask> <g data-v-aaf76ee2="" mask="url(#mask0)"><path data-v-aaf76ee2="" d="M71.0503 -30.0936C67.7534 -31.7772 63.5392 -30.9174 60.6136 -28.634C57.6879 -26.3506 55.8954 -22.8887 54.8426 -19.3309C53.7898 -15.773 53.3922 -12.0617 52.7313 -8.41356C52.0705 -4.76544 51.0942 -1.08858 49.0407 2.00201C47.3007 4.62121 44.8665 6.69798 42.8229 9.09109C36.0487 17.0317 34.0076 27.8494 32.2098 38.131" stroke="#ADCBFC" stroke-width="3.62573" stroke-miterlimit="10"></path> <path data-v-aaf76ee2="" d="M59.2249 27.047L12.2824 13.6537L-33.0126 14.8729" stroke="#D2D2D2" stroke-width="1.99415" stroke-miterlimit="10"></path> <path data-v-aaf76ee2="" d="M49.2093 -58.7348L42.4212 -23.747L31.5864 1.14459L26.7754 17.7887" stroke="white" stroke-width="1.99415" stroke-miterlimit="10"></path> <path data-v-aaf76ee2="" d="M32.3413 22.3408C32.6543 22.3821 32.9414 22.1619 32.9827 21.849C33.024 21.5361 32.8038 21.2489 32.4909 21.2076C32.178 21.1663 31.8908 21.3865 31.8495 21.6994C31.8082 22.0123 32.0284 22.2995 32.3413 22.3408Z" fill="#A4C754"></path> <path data-v-aaf76ee2="" d="M41.2664 20.0329C41.5793 20.0742 41.8665 19.854 41.9078 19.5411C41.9491 19.2282 41.7289 18.941 41.416 18.8997C41.103 18.8584 40.8159 19.0786 40.7746 19.3916C40.7333 19.7045 40.9535 19.9916 41.2664 20.0329Z" fill="#A4C754"></path> <path data-v-aaf76ee2="" d="M48.657 27.8375C48.9699 27.8788 49.2571 27.6586 49.2984 27.3457C49.3397 27.0328 49.1195 26.7456 48.8066 26.7043C48.4937 26.663 48.2065 26.8832 48.1652 27.1961C48.1239 27.509 48.3441 27.7962 48.657 27.8375Z" fill="#A4C754"></path> <path data-v-aaf76ee2="" d="M53.8123 6.87156C54.1252 6.91286 54.4124 6.69267 54.4537 6.37974C54.495 6.06682 54.2748 5.77966 53.9619 5.73836C53.6489 5.69706 53.3618 5.91725 53.3205 6.23018C53.2792 6.5431 53.4994 6.83026 53.8123 6.87156Z" fill="#A4C754"></path> <path data-v-aaf76ee2="" d="M56.389 10.1007C56.7019 10.142 56.989 9.9218 57.0303 9.60887C57.0716 9.29594 56.8515 9.00879 56.5385 8.96748C56.2256 8.92618 55.9384 9.14638 55.8971 9.4593C55.8558 9.77223 56.076 10.0594 56.389 10.1007Z" fill="#A4C754"></path> <path data-v-aaf76ee2="" d="M15.5845 -15.3007L31.5862 1.14441L68.8106 6.05754" stroke="white" stroke-width="1.99415" stroke-miterlimit="10"></path> <path data-v-aaf76ee2="" d="M40.1527 5.0704L34.0419 4.26386C33.846 4.23881 33.6475 4.28442 33.4821 4.39251C33.3168 4.50059 33.1953 4.66408 33.1396 4.85363L30.1374 15.1824C30.1074 15.2874 30.0984 15.3973 30.1109 15.5058C30.1234 15.6142 30.1572 15.7192 30.2102 15.8146C30.2633 15.91 30.3347 15.994 30.4203 16.0618C30.5059 16.1296 30.604 16.1799 30.709 16.2097L33.2829 16.9215C33.4778 16.975 33.6856 16.9557 33.8673 16.8671C34.0489 16.7785 34.1921 16.6267 34.2698 16.4401C35.7649 12.7519 37.9239 9.36931 40.6396 6.46021C40.7433 6.34942 40.8147 6.21232 40.846 6.06381C40.8773 5.9153 40.8673 5.76105 40.8172 5.61781C40.767 5.47457 40.6785 5.34781 40.5614 5.25131C40.4442 5.1548 40.3029 5.09223 40.1527 5.0704Z" fill="#A4C754"></path> <path data-v-aaf76ee2="" d="M62.6862 5.75033C58.3851 5.46586 54.019 7.87082 51.9604 11.6596C50.7732 13.849 50.3365 16.3452 49.7106 18.7512C48.4466 23.5993 46.3573 28.1936 43.5342 32.3327" stroke="#D2D2D2" stroke-width="0.906433" stroke-miterlimit="10"></path> <path data-v-aaf76ee2="" d="M51.1314 9.22931L51.7812 7.36612L48.3635 6.91503L47.1026 8.69756L51.1314 9.22931Z" fill="#A3A3A3"></path> <path data-v-aaf76ee2="" d="M49.8065 13.0342L50.7289 10.3875L46.318 9.80535L44.5259 12.3372L49.8065 13.0342Z" fill="#A3A3A3"></path> <path data-v-aaf76ee2="" d="M43.7411 13.4454L40.8527 17.5285L47.6681 19.1671L49.4022 14.1926L43.7411 13.4454Z" fill="#A3A3A3"></path> <path data-v-aaf76ee2="" d="M60.7612 11.7135L54.1843 10.8455L53.2567 17.8736L59.8336 18.7417L60.7612 11.7135Z" fill="#A4C754"></path> <path data-v-aaf76ee2="" d="M60.0421 20.8572L51.5381 19.7347L51.2531 21.8941L59.7571 23.0165L60.0421 20.8572Z" fill="#A3A3A3"></path> <path data-v-aaf76ee2="" d="M44.0948 25.2913L38.8652 24.6011L38.4581 27.6861L43.6876 28.3763L44.0948 25.2913Z" fill="#A3A3A3"></path> <path data-v-aaf76ee2="" d="M50.1879 27.0556L47.9285 32.0361L53.3326 32.7494L53.6914 28.1263L50.1879 27.0556Z" fill="#C3C0BC"></path> <path data-v-aaf76ee2="" d="M-11.8376 33.3764L18.0445 -27.8679C20.1534 -32.19 23.4003 -35.8558 27.4362 -38.4712C31.4721 -41.0865 36.1445 -42.5526 40.9511 -42.7118L74.0077 -43.8034" stroke="#F0C64C" stroke-width="2.17544" stroke-miterlimit="10"></path></g> <path data-v-aaf76ee2="" d="M62.7893 68.0465L7.57073 68.6941C6.92111 68.7039 6.29034 68.4762 5.79739 68.054C5.30445 67.6317 4.98339 67.044 4.89479 66.4018L0.027104 31.1765C-0.0244076 30.8034 0.00418614 30.4235 0.110989 30.0622C0.217791 29.7009 0.400361 29.3664 0.64659 29.0808C0.892818 28.7953 1.19708 28.5653 1.53919 28.406C1.8813 28.2467 2.25344 28.1618 2.63093 28.1569L66.7607 27.4065C67.1384 27.4023 67.5126 27.4783 67.8586 27.6294C68.2046 27.7805 68.5144 28.0033 68.7675 28.2831C69.0206 28.5628 69.2111 28.8931 69.3265 29.2519C69.4419 29.6108 69.4794 29.99 69.4367 30.3645L65.4009 65.6925C65.3275 66.3349 65.0217 66.9285 64.5409 67.3619C64.0601 67.7954 63.4372 68.0388 62.7893 68.0465Z" fill="#DAEEFF"></path> <path data-v-aaf76ee2="" d="M62.7961 68.8252L7.57756 69.4728C6.9297 69.4801 6.30144 69.2513 5.81066 68.8292C5.31988 68.4072 5.00031 67.8209 4.91192 67.1805L0.0339355 31.9578C-0.0176007 31.5844 0.0110596 31.2044 0.118013 30.8429C0.224967 30.4814 0.407767 30.1468 0.654275 29.8612C0.900783 29.5756 1.20536 29.3456 1.54778 29.1865C1.8902 29.0273 2.26263 28.9427 2.64034 28.9382L66.7701 28.1878C67.1477 28.1832 67.5219 28.2588 67.8679 28.4097C68.2139 28.5605 68.5237 28.7831 68.7768 29.0626C69.0299 29.3422 69.2205 29.6723 69.3359 30.031C69.4513 30.3897 69.4889 30.7689 69.4461 31.1432L65.418 66.4712C65.3444 67.1154 65.0372 67.7104 64.5542 68.144C64.0712 68.5777 63.4459 68.82 62.7961 68.8252Z" fill="#96B3CB"></path> <ellipse data-v-aaf76ee2="" cx="36.359" cy="49.4784" rx="10.0326" ry="10.0326" transform="rotate(0.5 36.359 49.4784)" fill="white"></ellipse> <rect data-v-aaf76ee2="" x="35.6277" y="44.8414" width="1.54348" height="9.26087" rx="0.77174" transform="rotate(0.500001 35.6277 44.8414)" fill="#96B3CB"></rect> <rect data-v-aaf76ee2="" x="40.9961" y="48.7471" width="1.54348" height="9.26086" rx="0.771738" transform="rotate(90.5 40.9961 48.7471)" fill="#96B3CB"></rect></svg>
          </div>
          <div class="title">
            <span>Create a Workspace</span>
          </div>
          <div class="input-field">
            <v-text-field placeholder="Workspace name" density="compact"></v-text-field>
          </div>
          <div class="btn-create">
            <v-btn width="136" heigth="48" elevation="2" color="primary" class="btn-c">Create</v-btn>
          </div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      dialog: false,
      select: "Asia",
      workspaces: "",
      recentWorkspaces: "",
      selectRegion: "sea",
      regions: [],
      colors: ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(255, 165, 0)', 'rgb(0, 0, 255)', 'rgb(255, 255, 0)'],
      token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODExNywibmFtZSI6InRyaWVuIG5ndXllbiIsImVtYWlsIjoidHJpZW4ubnYxOTU5MzRAZ21haWwuY29tIiwiY291bnRyeSI6Ik4vQSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BTG01d3UzX2c2bzc5X3N6ZWVPd0lZRVlsT01La0QtOURoZU8tQXdBbW5rMz1zOTYtYyIsImlhdCI6MTY4NDIzODg5MiwiZXhwIjoxNjg2ODMwODkyfQ.kjrCOTUhvQ9f1_HvNbGXe918dRw9BU0c_8dxg722f7-EFeysMHHRC0v-qUYm6viNrpcndEK6DZ-Ols4KcZS94w'
    };
  },
  computed: {
    Workspaces() {
      const _this = this
      const workspaces = this.workspaces
      const l = this.colors.length
      const len = this.workspaces.length
      if (len > 0) {
        workspaces.forEach((ws, i) => {
          let index = i % l
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
          rW[i].created_at = _this.handleDate(ws.created_at)
          rW[i].size_mb = _this.handleSize(ws.size_mb)
          rW[i] = {
            color: _this.colors[i],
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
.btn-c {
  height: 48px !important;
}
.container {
  border-radius: 4px;
  background-color: white;
  position: relative;
  .btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
    &:hover {
      cursor: pointer;
    }
  }
  .background {
    position: absolute;
    top: 0;
    width: 100%;
    height: 73px;
    background-color: #eceffb;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .content {
    padding: 20px 24px;
    .header-icon {
      z-index: 1;
      margin-bottom: 50px;
    }
    .title > span {
      font-size: 22px;
      font-weight: 400;
    }
    .input-field {
      margin-top: 40px;
      width: 300px;
    }
    .btn-create {
      margin: 50px 0;
    }
  }
}
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
    bottom: -6px;
    right: 0;
  }
}
.btn-list-item:hover{
  background-color: #e7e7e7 !important;
  cursor: pointer;
}
.btn-order {
  display: inline;
  margin-right: 10px;
  text-transform: none;
  padding: 0 4px;
  &:hover {
    cursor: pointer;
  }
  &.active {
    background-color: #d1e5f4;
    color: #006ec5;
    border-radius: 4px;
  }
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
  .search-field {
    max-width: 400px;
  }
}
@media screen and (max-width: 1299px) {
  .search-field {
    max-width: 300px;
  }
}
@media screen and (max-width: 1299px) {
  .search-field {
    max-width: 200px;
  }
}
@media screen and (max-width: 1000px) {
  .workspace {
    max-width: 800px;
    min-width: 200px;
  }
}
</style>
