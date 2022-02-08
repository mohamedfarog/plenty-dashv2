<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6">
          {{ footer_text}}
         
        </div>
        <div class="col-sm-6">
          <div class="text-sm-right d-none d-sm-block">
           Devoloped by MVP-APPS.AE
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import {version} from '../../package'
export default{
  data() {
    return{
      footer_text:''
    }
  },
  created(){
    this.footer_text = `2022 © Plentyofthings.com - v${version}`
  }
}
</script>
