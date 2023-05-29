<template>
  <div class="form">
    <div class="imgcontainer">
      <img src="@/assets/img_avatar2.png" alt="Avatar" class="avatar" />
    </div>

    <div class="container">
      <label><b>Email</b></label>
      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        required
      />

      <label><b>Password</b></label>
      <input
        v-model="password"
        type="password"
        placeholder="Enter your password"
        required
      />
      <button @click="login">Login</button>
    </div>

    <div class="container" style="background-color: #f1f1f1">
      <button type="button" class="cancelbtn">Cancel</button>
      <span class="psw">Forgot <a href="#">password?</a></span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      dialog: false,
      message: "",
    };
  },
  created() {
  },
  methods: {
    async login() {
      if (this.emailLogin === "" || this.passwordLogin === "") {
        alert("Invalid Credentials");
      } else {
        try {
          await axios
            .post(`${process.env.VUE_APP_BACKEND_URL}/login`, {
              email: this.email,
              password: this.password,
            })
            .then(() => {
              this.$router.push("/workspace");
            });
        } catch (error) {
          console.log(error.message);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Bordered form */
.form {
  width: 30%;
  margin: 10vh auto;
  border: 3px solid #f1f1f1;
}

/* Full-width inputs */
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

/* Extra style for the cancel button (red) */
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

/* Center the avatar image inside this container */
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

/* Avatar image */
img.avatar {
  width: 40%;
  border-radius: 50%;
}

/* Add padding to containers */
.container {
  padding: 16px;
}

/* The "Forgot password" text */
span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}
</style>
