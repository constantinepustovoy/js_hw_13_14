"use strict";
//data
$(function() {
var questions=[
	{
		question_text:'Что будет в консоле при console.log((\'5\'*5)+"5"+(+5));?',
		ansvers:['NaN55','2555','35'],
		true_ansver:[false,true,false]
	},
	{
		question_text:'Что будет в консоле при var i=\'8\'; console.log((i++)++);?',
		ansvers:['Uncaught ReferenceError: Invalid left-hand side expression in postfix operation','Uncaught ReferenceError: Invalid type operation','10'],
		true_ansver:[true,false,false]	
	},
	{
		question_text:'Что будет в консоле при var i=[{}]; console.log(i++);?',
		ansvers:['Uncaught ReferenceError: Undefined operator ++ ','NaN','[Object]'],
		true_ansver:[false,true,false]
	},
	{
		question_text:'Какие варианты правильно объявляют переменную для f, возвращающей сумму двух аргументов ?',
		ansvers:['var f = function(a,b) { return a+b }','var f = new Function(\'a,b\', \'return a+b\')','var f = new Function(\'a\', \'b\', \'return a+b\')','Никакие.'],
		true_ansver:[true,true,true,false]
	},
	{
		question_text:'В каких браузерах будет работать этот код?\nelement.style.setExpression("width", "100px")',
		ansvers:[' Internet Explorer 5.0+',' Internet Explorer 6.0+','Opera',' Firefox','Safari'],
		true_ansver:[false,false,true,true,true]
	}
];


var json_questions=JSON.stringify(questions);             //какая выгода если мы каждый раз записываем?
localStorage.setItem('local_storage_questions',json_questions);
var store_questions=localStorage.getItem('local_storage_questions');
store_questions=JSON.parse(store_questions);//+ object
var page_template=$('#0').html();//+ template

  var tmpl = _.template(page_template);
  var result = tmpl({list:store_questions});
 $('body').append(result);


	

//end data
function show_answer(test_result){
	var you_res=0;
	for(var i=0;i<test_result.length;++i){
    if(test_result[i])++you_res;
	}

  
    var modal_window_template=$("#modal_window").html();//template
     modal_window_template = _.template(modal_window_template);
     var new_modal=modal_window_template({test_result:test_result,you_res:you_res});
     $('body').append(new_modal);
     $(".overlay").css({"visibility":"visible"});
	 $("#closeModal").on("click",function(){
     $(".overlay").detach();//.css({"visibility":"hidden"});

	});
	 
}
	

function check(e){
 e.preventDefault();
 var test_result=[];

	for(var i=0;i<questions.length;++i){
		var is_correct=false;
		var correct_counter=0;
		for(var j=0;j<questions[i].true_ansver.length;++j){
            if (questions[i].true_ansver[j]===document.getElementsByName(i+'name')[j].checked) {
         
         	correct_counter++;
            }  
           document.getElementsByName(i+'name')[j].checked = false;

        }
        if(correct_counter===questions[i].true_ansver.length)is_correct=true;

        test_result[i]=is_correct;
	}
	show_answer(test_result);
	 
}


var Button=document.getElementsByClassName("Button");
Button[0].addEventListener("click",check);

 });





