<template>
  <div>
    <Alert></Alert>
    <Navbar></Navbar>
    <Sidebar></Sidebar>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Alert from '@/components/frontend/Alert'
export default {
  components: {
    Sidebar,
    Navbar,
    Alert
  }
}
</script>
