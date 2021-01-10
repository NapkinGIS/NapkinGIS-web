<template>
  <v-layout class="user-dashboard column">
    <v-layout class="align-center grey lighten-2 px-3 py-1 shrink">
      <div class="headline">Projects</div>
      <v-spacer/>
      <div class="user-card layout column justify-end shrink">
        <v-layout justify-end>
          <v-layout class="username column justify-center align-end mx-1 grow">
            <div class="subheading">{{ user.username }}</div>
            <div
              v-if="user.username !== user.full_name"
              class="caption text--secondary"
              v-text="user.full_name"
            />
          </v-layout>
          <v-btn href="/user/" class="mr-1 accountBtn" icon small>
            <v-icon color="secondary" size="22">account_circle</v-icon>
          </v-btn>

          <v-btn
            @click="logout"
            class="secondary text-capitalize mr-0"
            dark flat round small
          >
            <v-icon size="20" class="mr-1">exit_to_app</v-icon>
            <span>Sign out</span>
          </v-btn>
        </v-layout>
      </div>
    </v-layout>
    <v-divider/>
    <v-progress-circular
      v-if="loadingProjects"
      class="my-4 mx-auto"
      indeterminate
    />
    <v-list
      v-else-if="projects.length > 0"
      class="grow"
      two-line
    >
      <v-list-tile
        v-for="project in projects"
        :key="project.project"
        :href="`?PROJECT=${project.project}`"
      >
        <v-list-tile-content>
          <v-list-tile-title v-text="project.title"/>
          <v-list-tile-sub-title
            class="caption"
            v-text="project.publication_time"
          />
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <div v-else class="py-4 px-3 mx-auto">
      <p class="py-4 title">No projects published</p>
      <p>
        Use QGIS with the NapkinGIS plugin to prepare and publish your maps.
        <v-btn
          href="/user/"
          class="secondary text-capitalize"
          round small
        >
          <v-icon class="mr-1" size="20">account_circle</v-icon>
          Profile
        </v-btn>
      </p>
    </div>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: { },
  data () {
    return {
      loadingProjects: false,
      projects: []
    }
  },
  computed: {
    ...mapState(['app', 'user'])
  },
  mounted () {
    //document.querySelector('.accountBtn').click() // auto-redirect to /user page
    this.fetchProjects()
  },
  methods: {
    logout () {
      this.$http.logout().then(() => location.reload())
    },
    async fetchProjects () {
      this.loadingProjects = true
      try {
        const { data } = await this.$http.get('/api/projects/')
        this.projects = data.projects
      } finally {
        this.loadingProjects = false
      }
    },
    openProject (project) {
      location.search = `PROJECT=${project.project}`
    }
  }
}
</script>

<style lang="scss" scoped>
.v-list__tile__content {
  border-bottom: 1px solid #ddd;
}
p {
  max-width: 400px;
}

.username {
  @media (max-width: 450px) {
    visibility: hidden;
  }
}
</style>
