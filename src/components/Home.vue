<template>
<div>

<!-- Container (Carusel) -->
<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="/images/carusel/pic1.jpg" height=200px alt="First slide">
		 <div class="carousel-caption d-none d-md-block">
    <h2>Tanuljon könnyen gyorsan</h2>
    <p>Interaktív példamegoldás</p>
  </div>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="/images/carusel/pic2.jpg" height=200px alt="Second slide">
		 <div class="carousel-caption d-none d-md-block">
    <h2>Érettség példák</h2>
    <p>Interaktív példamegoldása</p>
    </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
<!-- Container (/Carusel) -->
	<div class="container">

		<div class="alert alert-info"><h4>Matematika példák megoldása interaktív módon</h4> </div>
		<div class="animated zoomIn contentText"> 
		<div class="text-justify">
		<p><b>Rövid használati útmutató</b></p>
		<p>Válasszon egy páldát majd a <img src='/images/start1.svg' width='30px' hspace='5px'>gomb megnyomásával indítsa meg a megoldást. </p>
		<p>A megjelenő képlet 
	<math xmlns="http://www.w3.org/1998/Math/MathML" ><msub><mi>x</mi><mrow><mn>1</mn><mo>,</mo><mn>2</mn></mrow></msub><mo>=</mo><mfrac><mrow><mo>-</mo><mi>b</mi><mo>&#xB1;</mo><msqrt><msup><mi>b</mi><mn>2</mn></msup><mo>-</mo><mn>4</mn><mi>a</mi><mi>c</mi></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></math>	
 vagy ábra 
	<img src="/svg/test.svg" width="200px">
		rákattintásával kérehtő a következő lépés. Folytassa ezt a megoldásig. Az utolső lépés, azaz a megoldás, zöld színnel van ábrázolva.</p>
		Amennyiben az adott lépéshez segítség érhető el, ez a  
		
		<button type="button" class="btn btn-warning">Segítség elérhető</button>
		gombra való kattintással tekintehtő  és hallgatható meg.
		<p>A megoldás menetét bármikor újból indíthatja a <img src='/images/start0.svg' width='30px' hspace='5px'>gombal. </p>
		<p>A megoldás összes lépése megtekinthető a <img src='/images/all1.svg' width='30px' hspace='5px'>gomb rákattintásával, ugyanez elrejthető a <img src='/images/all0.svg' width='30px' hspace='5px'>gombal</p>
		<p>A végső megoldást megtekinthető a <img src='/images/solution1.svg' width='30px' hspace='5px'>gomb rákattintásával, ugyanez elrejthető a <img src='/images/solution0.svg' width='30px' hspace='5px'>gombal</p>
		<p>A példa megoldásához szükséges elméleti tudást  megtekinthető a <img src='/images/theory1.svg' width='30px' hspace='5px'>gomb rákattintásával, ugyanez elrejthető a <img src='/images/theory0.svg' width='30px' hspace='5px'>gombal</p>
		<p>A példa megoldásának menete automatikusan is lejátszható  a <img src='/images/autoplay.svg' width='30px' hspace='5px'> gomba segítségével.</p>
		</div>
		</div>

	</div>

<div class="jumbotron">
  <h3>Szegedi Tudományegyetem</h3>
  <p>Természettudományi és Informatikai Kar</p>
</div>
	</div>
</template>

<script>


		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    export default {
        data() {
            return {
					w3class:"",
 					nextNum: 100
            }
        },
        methods: {
			  w3() {
				  this.w3class="w3-animate-zoom";
	//			  alert("xxx");
				  
				  }
	 }
	 }
</script>

<style>
.contentText {
	font-size: 1.2em;
}

.gap { 
padding:10px;
}
</style>

