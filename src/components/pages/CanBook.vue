<template>
  <div>
    <Alert></Alert>
    <nav>
      <div class="l-nav-table">
        <router-link to="/canbook/featuredBooks" class="l-logo">
          <img src="../../assets/image/logo2.png" alt="">
        </router-link>
        <ul class="l-nav-icon">
          <li><a href="https://www.facebook.com/profile.php?id=100006422868349" alt="Facebook 粉絲專頁"><i class="fab fa-facebook-square"></i></a></li>
          <li><a href="https://line.me/zh-hant/" alt="LINE 官方帳號"><i class="fab fa-line"></i></a></li>
          <li><a href="https://www.instagram.com/?hl=zh-tw" alt="Instagram"><i class="fab fa-instagram"></i></a></li>
          <li><a href="https://twitter.com/home?lang=zh-tw" alt="Twitter"><i class="fab fa-twitter-square"></i></a></li>
        </ul>
        <ul class="l-nav-mainOption">
          <li><router-link to="/canbook/shop">優秀好書</router-link></li>
          <li><router-link to="/canbook/news">最新消息</router-link></li>
          <li><router-link to="/canbook/surprise">優惠驚喜</router-link></li>
          <li><router-link to="/canbook/aboutUs">關於我們</router-link></li>
          <li class="l-nav-user">
            <router-link to="/login">
              <i class="fas fa-user"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <main>
      <router-view></router-view>
    </main>

    <footer>
      <div class="l-footer-table">
        <div class="l-footer-widthCalc">
          <div class="l-logo2">
            <router-link to="/canbook/featuredBooks">
              <i class="fas fa-chess"></i>
              <img src="../../assets/image/logo2.png" alt="">
            </router-link>
          </div>
          <ul class="l-footer-news">
            <li><i class="fas fa-phone-alt"></i>&nbsp;09-87878787</li>
            <li><i class="fas fa-map-marker-alt"></i>&nbsp;高雄市小港區平和南路300號</li>
            <li><i class="fas fa-envelope"></i>&nbsp;helloVue@gmail.com</li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Alert from './Alert';
export default {
  components: {
    Alert,
  }
}
</script>
