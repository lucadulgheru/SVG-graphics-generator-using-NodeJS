"use strict";

var position = {

    position_x : 0,

    position_y : 0

};


var drawing_object = {

    pen : 'rgb(0,0,0)',

    fill : 'rgb(255,255,255)'



};

function $Variable(name, value){

    this.name = name;

    this.value = value;


}


var variables = [];

function read_file (){

    var fs = require('fs');

    var final_output;
 
        try {

        
            var data = fs.readFileSync(process.argv[2]).toString().split('\n');
                
                return data;
            
        } 
        
        catch(err) {

             console.error(err);

        }


}


function write_file(text_to_write){

    var fs = require('fs');
 
        try {

            fs.writeFileSync(process.argv[3], text_to_write , {'flag':'a'},'utf8');

        } 
    
    catch(err) {

            console.error(err);

    }


}


write_file("<svg"+'\n'+'\n'+

          "xmlns="+'"http://www.w3.org/2000/svg"'+'>'+'\n'+'\n'

          );



function location(x,y){

        position.position_x = x;

        position.position_y = y;


}

function set_color(r,g,b,type){


        if(type=='pen')

            drawing_object.pen = 'rgb('+r+','+g+','+b+')';

        else if(type=='fill')

            drawing_object.fill = 'rgb('+r+','+g+','+b+')';



}

function var_init(name,val){


    variables.push(new $Variable(name,val));

}

function re_init(name){


    
}


function draw_line(x,y,type){

var execute_statement;

    if(type=='location') {
        execute_statement = ' '+'<line x1='+'"'+position.position_x+'"'+' '+ 
                                  'y1='+'"'+position.position_y+'"'+' '+
                                  'x2='+'"'+x+'"'+' y2='+'"'+y+'"'+' '+'style='+'"'+'stroke:'+drawing_object.pen+';stroke-width:1" />';
                                }

        else if (type=='polar')
            execute_statement='';

    write_file(execute_statement+'\n'+'\n');
}

function draw_circle(r,x,y){


    var execute_statement = ' '+'<circle cx='+'"'+x+'"'+' '+
                                         'cy='+'"'+y+'"'+' '+ 
                                         'r='+'"'+r+'"'+' '+'style='+'"'+'stroke:'+drawing_object.pen+';stroke-width:1;fill:'+drawing_object.fill+'"'+' />';

    write_file(execute_statement+'\n'+'\n');



}

function draw_ellipse(r1,r2,x,y){


    var execute_statement = ' '+'<ellipse cx='+'"'+x+'"'+' '+
                                          'cy='+'"'+y+'"'+' '+ 
                                          'rx='+'"'+r1+'"'+' '+
                                          'ry='+'"'+r2+'"'+' '+
                                          'style='+'"'+'stroke:'+drawing_object.pen+';stroke-width:1;fill:'+drawing_object.fill+'"'+' />';

    write_file(execute_statement+'\n'+'\n');




}

function draw_rectangle(x1,y1,x2,y2){

    var execute_statement=' '+'<path d='+'"M'+x1+','+y1+' '+x2+','+y1+' '+x2+','+y2+' '+x1+','+y2+'"'+' '+
    
                            'style='+'"'+'stroke:'+drawing_object.pen+';stroke-width:1;fill:'+drawing_object.fill+'"'+' />';

    write_file(execute_statement+'\n'+'\n');

}

//import instructions from file into array

var instructions = read_file();

for(i = 0 ;i<instructions.length;i++)
    if(instructions[i]=='')
        instructions[i]='empty_line';

/*
for(var i = 0;i<instructions.length;i++)
        instructions[i] = instructions[i].replace(/\s+/g,' ').trim();
  
        
*/

//filtered it so that it gets rid of spaces and carriage return
//EDIT: since RegEx are forbidden, this no longer works



var j;

for(var i = 0;i<instructions.length;i++){


    if(instructions[i].includes('&',0)||instructions[i]=='empty_line'||instructions[i]=='\r'){

        

    }


         else if(instructions[i].includes('LOCATION'))
            {

                //var numbers = instructions[i].match(/\d+/g);
                //EDIT: no longer works since RegEx are forbidden

                var numbers = [];

                var str = instructions[i].substring(instructions[i].indexOf(':')+1);

                numbers=str.split(' ');

                for(j=numbers.length-1;j>=0;j--){

                    if(numbers[j]==''||numbers[j]=='\r')
                        numbers.splice(j,1);
                }

           

                    try{

                            if(numbers.length!=2) throw 'LINE '+Number(i+1)+' HAS ERROR: LOCATION uses 2 parameters, you wrote '+Number(numbers.length);

                                else if (isNaN(numbers[0])) throw 'LINE '+Number(i+1)+' HAS ERROR: LOCATION parameter 1 needs to be a variable or a number, you wrote '+numbers[0];

                                else if (isNaN(numbers[1])) throw 'LINE '+Number(i+1)+' HAS ERROR: LOCATION parameter 2 needs to be a variable or a number, you wrote '+numbers[0];

                            location(numbers[0],numbers[1]);

                    }

                    catch(err){

                        console.log(err);

                    }


            }


       else if(instructions[i].includes('DRAW_LINE'))
        {

           // var numbers = instructions[i].match(/\d+/g);
           // EDIT: no longer works since RegEx are forbidden

           var numbers = [];

           var str = instructions[i].substring(instructions[i].indexOf(':')+1);

           numbers=str.split(' ');

                for(j=numbers.length-1;j>=0;j--){

                    if(numbers[j]==''||numbers[j]=='\r')
                        numbers.splice(j,1);
                }

  


           try{

                if(Number(numbers.length)!=3) throw 'LINE '+Number(i+1)+' HAS ERROR: DRAW_LINE uses 3 parameters, you wrote '+ Number(numbers.length);

                    else if(numbers[2]!=='location' && numbers[2]!=='polar') throw 'LINE '+Number(i+1)+' HAS ERROR: DRAW_LINE parameter 3 needs to be one of (location, polar), you wrote '+ numbers[2];

                        else{

                            for(j=0;j<numbers.length-1;j++){

                                if(isNaN(numbers[j])) throw 'LINE '+Number(i+1)+' HAS ERROR: DRAW_LINE parameter '+numbers[j]+' needs to be a number or a variable, you wrote '+ numbers[j];
    
                        
    
                            }

                        }

                draw_line(numbers[0],numbers[1]);

            }


            catch(err){


                    console.log(err);
            }



       } 


       else if(instructions[i].includes('DRAW_CIRCLE'))
        {

           //var numbers = instructions[i].match(/\d+/g);
           // EDIT: no longer works since RegEx are forbidden


           var numbers = [];

           var str = instructions[i].substring(instructions[i].indexOf(':')+1);

           numbers=str.split(' ');

           for(j=numbers.length-1;j>=0;j--){

               if(numbers[j]==''||numbers[j]=='\r')
                   numbers.splice(j,1);
           }


                try{

                        if(Number(numbers.length)!=3) throw 'LINE '+Number(i+1)+' HAS ERROR: DRAW_CIRCLE uses 3 parameters, you wrote '+ Number(numbers.length);

                        draw_circle(numbers[0],numbers[1],numbers[2]);

                }


                catch(err){


                    console.log(err);
                }



        }



        else if(instructions[i].includes('DRAW_ELLIPSE'))
        {

           //var numbers = instructions[i].match(/\d+/g);
           // EDIT: no longer works since RegEx are forbidden


           var numbers = [];

           var str = instructions[i].substring(instructions[i].indexOf(':')+1);

           numbers=str.split(' ');

           for(j=numbers.length-1;j>=0;j--){

               if(numbers[j]==''||numbers[j]=='\r')
                   numbers.splice(j,1);
           }

          


                try{

                        if(Number(numbers.length)!=4) throw 'LINE '+Number(i+1)+' HAS ERROR: DRAW_ELLIPSE uses 4 parameters, you wrote '+ Number(numbers.length);

                        draw_ellipse(numbers[0],numbers[1],numbers[2],numbers[3]);

                }


                catch(err){


                    console.log(err);
                }



        }




        else if(instructions[i].includes('DRAW_RECTANGLE'))
        {

           //var numbers = instructions[i].match(/\d+/g);
           // EDIT: no longer works since RegEx are forbidden


           var numbers = [];

           var str = instructions[i].substring(instructions[i].indexOf(':')+1);

           numbers=str.split(' ');

           for(j=numbers.length-1;j>=0;j--){

               if(numbers[j]==''||numbers[j]=='\r')
                   numbers.splice(j,1);
           }

          


                try{

                        if(Number(numbers.length)!=4) throw 'LINE '+Number(i+1)+' HAS ERROR: DRAW_RECTANGLE uses 4 parameters, you wrote '+ Number(numbers.length);

                        draw_rectangle(numbers[0],numbers[1],numbers[2],numbers[3]);

                }


                catch(err){


                    console.log(err);
                }



        }


        else if(instructions[i].includes('SET_COLOR'))
        {

           // var numbers = instructions[i].match(/\d+/g);
           // EDIT: no longer works since RegEx are forbidden

           var numbers = [];

           var str = instructions[i].substring(instructions[i].indexOf(':')+1);

           numbers=str.split(' ');

                for(j=numbers.length-1;j>=0;j--){

                    if(numbers[j]==''||numbers[j]=='\r')
                        numbers.splice(j,1);
                }



           try{

                if(Number(numbers.length)!=4) throw 'LINE '+Number(i+1)+' HAS ERROR: SET_COLOR uses 4 parameters, you wrote '+ Number(numbers.length);

                    else if(numbers[3]!=='pen' && numbers[3]!=='fill') throw 'LINE '+Number(i+1)+' HAS ERROR: SET_COLOR parameter 4 needs to be one of (pen, fill), you wrote '+ numbers[3];

                    else {
                        for(j=0;j<numbers.length-1;j++){

                            if(isNaN(numbers[j])) throw 'LINE '+Number(i+1)+' HAS ERROR: SET_COLOR parameter '+numbers[j]+' needs to be a number or a variable, you wrote '+ numbers[j];

                                else if(numbers[j]<0 || numbers[i]>255) throw 'LINE '+Number(i+1)+' HAS ERROR: SET_COLOR parameter '+numbers[j]+' needs to be a number or a variable between [0, 255], you wrote '+ numbers[j];

                        }
                    }
                set_color(numbers[0],numbers[1],numbers[2],numbers[3]);

            }


            catch(err){


                    console.log(err);
            }



       } 




       else if(instructions[i].includes('INIT'))
        {

           // var numbers = instructions[i].match(/\d+/g);
           // EDIT: no longer works since RegEx are forbidden

           var numbers = [];

           var str = instructions[i].substring(instructions[i].indexOf(':')+1);

           numbers=str.split(' ');

                for(j=numbers.length-1;j>=0;j--){

                    if(numbers[j]==''||numbers[j]=='\r')
                        numbers.splice(j,1);
                }



           try{

                if(Number(numbers.length)!=2) throw 'LINE '+Number(i+1)+' HAS ERROR: INIT needs 2 parameters, you wrote '+ Number(numbers.length);

                    else if(!isNaN(numbers[0])) throw 'LINE '+Number(i+1)+' HAS ERROR: INIT parameter 1 needs to be a variable, you wrote '+ numbers[0];

                        else if(isNaN(numbers[1])) throw 'LINE '+Number(i+1)+' HAS ERROR: INIT parameter 2 needs to be a number or a variable, you wrote '+ numbers[1];
                        
                var_init(numbers[0],numbers[1]);

            }


            catch(err){


                    console.log(err);
            }



       } 



       else if(instructions[i].includes('ADDITION'))
       {

          // var numbers = instructions[i].match(/\d+/g);
          // EDIT: no longer works since RegEx are forbidden

          var numbers = [];

          var str = instructions[i].substring(instructions[i].indexOf(':')+1);

          numbers=str.split(' ');

               for(j=numbers.length-1;j>=0;j--){

                   if(numbers[j]==''||numbers[j]=='\r')
                       numbers.splice(j,1);
               }


               if(isNaN(numbers[1])){
                    for(j=0;j<variables.length;j++){
                        if(variables[j].name===numbers[i])
                            numbers[1]=variables[j].value;
                    }
               }

          try{

               if(Number(numbers.length)!=2) throw 'LINE '+Number(i+1)+' HAS ERROR: ADDITION needs 2 parameters, you wrote '+ Number(numbers.length);

                   else if(!isNaN(numbers[0])) throw 'LINE '+Number(i+1)+' HAS ERROR: ADDITION parameter 1 needs to be a variable, you wrote '+ numbers[0];

                       else if(isNaN(numbers[1]) && isNaN(numbers[1].value)) throw 'LINE '+Number(i+1)+' HAS ERROR: ADDITION parameter 2 needs to be a number or a variable, you wrote '+ numbers[1];
                       
               var_init(numbers[0],numbers[1]);

           }


           catch(err){


                   console.log(err);
           }



      } 



        else console.log('LINE '+Number(i+1)+' HAS ERROR: Command not existing '+ instructions[i]);






}



write_file('\n'+'\n'+'</svg>');