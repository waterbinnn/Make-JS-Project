/*버튼0 누르면 
- 모든 버튼에 붙은 orange 클래스명 제거 
- 버튼 0 에 orange 클래스명 추가 
- div 0 에 show 클래스명 추가 
*/

// $('.tab-button').eq(0).on('click', function(){
//   $('.tab-button').removeClass('orange');
//   $('.tab-button').eq(0).addClass('orange');
//   $('.tab-content').removeClass('show');
//   $('.tab-content').eq(0).addClass('show');
// });

//for 반복문 
// const $num = $('.tab-button').length;;

// for (let i = 0; i < $num; i++){
  
  //   btn.eq(i).on('click', function(){
    //     openTab(i);
    //   })
    // }
    
    const content = $('.tab-content');
    const btn = $('.tab-button');

    function openTab(n){
      btn.removeClass('orange');
      btn.eq(n).addClass('orange');
      content.removeClass('show');
      content.eq(n).addClass('show');
}

$('.list').click(function(e){
  //지금 누른 data-id를 parameter로 
  // console.log(e.target.dataset.id); 를 하면 0 , 1 , 2 가 나오니깐 그걸 이용해서
  openTab(e.target.dataset.id); // 여기 파라미터로 데이터셋을 받음 ! 그럼 for 문 이용하지 않아도 됨 
})