<template>
<div class="product-container">
  <div class="product-box">
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: "aboutProduct"
}
</script>

<style scoped>
.product-container {

}

.product-container .product-box {
  height: 100px;
  width: 80%;
  margin: 0 auto;
  background-color: green;
  border-radius: 5px;


}
.product-box ul{
  display: flex;
  justify-content: space-between;
  list-style: none;
}

</style>
