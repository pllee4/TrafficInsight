<template>
<section class="login">
  <header class="login-header">
    <!-- <div class="hero-header-item hero-logo" aria-hidden="true">
      <div class="hero-logo-circles">
        <img class="hero-logo-circle1" src="../assets/circle/red-semi.svg" />
        <img class="hero-logo-circle1" src="../assets/circle/red.svg" />
        <img class="hero-logo-circle2" src="../assets/circle/orange-semi.svg" />
        <img class="hero-logo-circle2" src="../assets/circle/orange.svg" />
        <img class="hero-logo-circle3" src="../assets/circle/yellow-semi.svg" />
        <img class="hero-logo-circle3" src="../assets/circle/yellow.svg" />
        <img class="hero-logo-circle4" src="../assets/circle/green-semi.svg" />
        <img class="hero-logo-circle4" src="../assets/circle/green.svg" />
        <img class="hero-logo-circle5" src="../assets/circle/blue-semi.svg" />
        <img class="hero-logo-circle5" src="../assets/circle/blue.svg" />
      </div>
    </div> -->
    <h1 class="brand">
      <router-link to="/" tabindex="-1">Traffic Insight</router-link>
    </h1>
    <el-alert v-if="error" :title="error.title" type="warning" :description="error.message" show-icon />
  </header>
  <el-form class="login-form" auto-complete="off" :model="model" :rules="rules" ref="login-form" label-position="top">
    <h2 class="heading">Sign-in</h2>
    <el-form-item label="Login" prop="username">
      <el-input type="text" v-model="model.username" placeholder="Please enter username" />
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input type="password" v-model="model.password" placeholder="Please enter password" />
    </el-form-item>
    <el-button type="primary" :loading="loading" @click="submit('login-form')">{{ loading ? 'Loading...' : 'Login' }}</el-button>
  </el-form>
  <footer class="login-footer">
    ← Back to <a href="/"> Home </a>
  </footer>
</section>
</template>

<script>
// https://github.com/auth0-blog/vue-jwt-authentication
// https://auth0.com/blog/build-an-app-with-vuejs/

export default {
  name: 'login',

  title: 'Login',

  data() {
    // form model
    // TODO: remove default values
    const model = {
      username: 'pllee4', //zce
      password: '12345678' //wanglei
    }

    // form validate rules
    const rules = {
      username: [{
          required: true,
          message: 'Username is required'
        },
        {
          min: 2,
          max: 16,
          message: 'Username must be between 2 and 16 characters'
        }
      ],
      password: [{
          required: true,
          message: 'Password is required'
        },
        {
          min: 4,
          max: 16,
          message: 'Password must be between 4 and 16 characters'
        }
      ]
    }

    return {
      model: model,
      rules: rules,
      error: null,
      loading: false
    }
  },

  methods: {
    submit(ref) {
      // form validate
      this.$refs[ref].validate(valid => {
        if (!valid) return false

        // validated
        this.error = null
        this.loading = true

        // create token from remote
        this.$store.dispatch('createToken', this.model)
          .then(token => {
            this.$router.replace({
              path: this.$route.query.redirect || '/'
            })
            this.loading = false
          })
          .catch(err => {
            this.$router.replace({
              path: this.$route.query.redirect || '/'
            })
            this.loading = false
            console.error(err)
            this.error = {
              title: 'Error occurred',
              message: 'Abnormal, please try again later!'
            }
            switch (err.response && err.response.status) {
              case 401:
                this.error.message = 'Incorrect username or password!'
                break
              case 500:
                this.error.message = 'Internal server error, please try again later!'
                break
            }
            this.loading = false
          })
      })
    }
  }
}
</script>

<style scoped>
.hero-logo-circles {
  position: fixed;
  /* width: 20%; */
}

.hero-logo-circle1 {
  position: fixed;
  margin-left: 2.6%;
  width: 17.5%;
  -webkit-animation: rotating 40s linear infinite;
}

.hero-logo-circle2 {
  position: fixed;
  margin-left: 2.6%;
  width: 17.5%;
  -webkit-animation: rotating 60s linear infinite;
}

.hero-logo-circle3 {
  position: fixed;
  margin-left: 2.6%;
  width: 17.5%;
  -webkit-animation: rotating 80s linear infinite;
}

.hero-logo-circle4 {
  position: fixed;
  margin-left: 2.6%;
  width: 17.5%;
  -webkit-animation: rotating 100s linear infinite;
}

.hero-logo-circle5 {
  position: fixed;
  margin-left: 2.6%;
  width: 17.5%;
  -webkit-animation: rotating 120s linear infinite;
}
</style>

<style lang="scss">
@import '../assets/styles/variables';

.login {
    flex: 1;
    width: 95%;
    max-width: 22rem;
    margin: 0 auto;
    font-size: 0.875rem;

    &-header {
        margin-bottom: 1rem;

        .brand {
            margin: 6.5rem 0 3.5rem;
            text-align: center;
            letter-spacing: 0.125rem;

            a {
                margin: 0;
                color: $brand-color;
                font: 300 3rem sans-serif;

                &:hover {
                    color: $brand-hover-color;
                    text-shadow: 0 0 1rem $brand-hover-color;
                }
            }
        }
    }

    &-form {
        margin-top: 3rem;
        margin-bottom: 2.5rem;
        padding: 1.875rem 1.25rem;
        background: $login-form-background;
        color: $login-form-color;

        .heading {
            margin: 0 0 1rem;
            font-weight: 400;
            font-size: 1.5rem;
        }

        .el-button {
            margin-top: 0.5rem;
            width: 100%;
        }
    }

    &-footer {
        margin-bottom: 1rem;
        padding: 0.625rem;
        border: 0.0625rem solid $brand-color;
        font-size: 0.75rem;
        text-align: center;

        a {
            color: $brand-color;
        }
    }
}
</style>
