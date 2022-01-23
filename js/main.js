// 마우스 우클릭 금지
// $("body").on("contextmenu", function(){
//     return false;
// })

const itemList =$("#works .itemList");
const filterItem =$("#filter li");
let grid = null;

$.ajax({
    url: "../data/typo.json",
    success: function(res){
        // console.log(res);
        const typoList = [...res.typoList];
        let output = "";
        $.each(typoList, function(i, item){
            output += `<li class="item ${item.category}">
                            <a href="../images/${item.img}" data-fancybox="${item.category}" data-caption="${item.title} <a href='http://www.daum.net' target='_blank'>link</a>">
                            <div class="img">
                                <img src="../images/${item.img}" alt="" />
                            </div>
                            <div class="info">
                                <h2>${item.title}</h2>
                                <p class="desc">${item.desc}</p>
                                <p class="point">
                                <span>${item.point}</span>
                                </p>
                            </div>
                            </a>
                        </li>`
        })
        itemList.html(output);
        
        // masonry layout
        // 이벤트 이미지가 싹 다 로드 된 다음... 왜냐하면 이미지의 높이에 따라 부모의 높이가 결정되기 때문..
        // 자바스크립트 변수의 요효 범위(scope)는 block {} 안에서만 유효하다.
        // 특별하게 var의 경우는 function scope를 따른다.        
        itemList.imagesLoaded( function() {
            grid = itemList.isotope({
                itemSelector: '.item',
                getSortData: {
                    title: '.title', // text from querySelector
                    point: '.point parseFloat', // value of attribute
                },
                sortBy: [ "point", "title" ]
            })
        });
    }
});

filterItem.on("click", function(){
    const _this = $(this);
    _this.addClass("on").siblings().removeClass("on");
    const _filter = "."+_this.data("filter");
    grid.isotope({ filter: _filter });
});

const cursor = $(".cursor")
$(window).on("mousemove", function(e){
    console.log(e);
    // $("input[name='clientY']").val(e.clientY);
    // $("input[name='pageY']").val(e.pageY);
    // $("input[name='offsetY']").val(e.offsetY);
    // $("input[name='screenY']").val(e.screenY);
    gsap.to(cursor, {left:e.clientX, top: e.clientY});
});

function cursorLeave(){
    cursor.find(".txt").text("");
    gsap.killTweensOf(".cursor");
    gsap.to(cursor, {width:10, height:10, background:"#fff", ease: "power4", duration: 0.2});

}
function cursorEnter(msg){
    cursor.find(".txt").text(msg);
    gsap.killTweensOf(".cursor");
    gsap.to(cursor, {width:80, height:80, background:"#c92a2a", ease: "elastic", duration: 1});
    
}
itemList.on("mouseenter", function(){
    cursorEnter("VIEW");
});
itemList.on("mouseleave", function(){
    cursorLeave();
});
$("#filter ul").on("mouseenter", function(){
    cursorEnter("CLICK");
});
$("#filter ul").on("mouseleave", function(){
    cursorLeave();
});