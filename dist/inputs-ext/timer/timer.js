/**
Timer editable input.
Internally value stored as {min: "00", sec: "00"}

@class timer
@extends abstractinput
@final
@example
<a href="#" id="timer" data-type="timer" data-pk="1">awesome</a>
<script>
$(function(){
    $('#address').editable({
        url: '/post',
        title: 'Enter the timer #',
        value: {
            hour: "00",
            min: "00",
            sec: "00"
        }
    });
});
</script>
**/
(function ($) {
    "use strict";
    
    var Timer = function (options) {
        this.init('timer', options, Timer.defaults);
    };

    //inherit from Abstract input
    $.fn.editableutils.inherit(Timer, $.fn.editabletypes.abstractinput);

    $.extend(Timer.prototype, {
        /**
        Renders input from tpl

        @method render() 
        **/        
        render: function() {
           this.$input = this.$tpl.find('input');
        },
        
        /**
        Default method to show value in element. Can be overwritten by display option.
        
        @method value2html(value, element) 
        **/
        value2html: function(value, element) {
            if(!value) {
                $(element).empty();
                return; 
            }

            var h = value.hour < 10 ? '0' + value.hour : value.hour;
            var m = value.min < 10 ? '0' + value.min : value.min;
            var s = value.sec < 10 ? '0' + value.sec : value.sec;

            var html = $('<div>').text(h).html() + ':' + $('<div>').text(m).html() + ':' + $('<div>').text(s).html();
            $(element).html(html); 
        },
        
        /**
        Gets value from element's html
        
        @method html2value(html) 
        **/        
        html2value: function(html) {
          return null;  
        },
      
       /**
        Converts value to string. 
        It is used in internal comparing (not for sending to server).
        
        @method value2str(value)  
       **/
       value2str: function(value) {
           var str = '';
           if(value) {
               for(var k in value) {
                   str = str + k + ':' + value[k] + ';';  
               }
           }
           return str;
       }, 
       
       /*
        Converts string to value. Used for reading value from 'data-value' attribute.
        
        @method str2value(str)  
       */
       str2value: function(str) {
           /*
           this is mainly for parsing value defined in data-value attribute. 
           If you will always set value by javascript, no need to overwrite it
           */
           return str;
       },                
       
       /**
        Sets value of input.
        
        @method value2input(value) 
        @param {mixed} value
       **/         
       value2input: function(value) {
           if(!value) {
             return;
           }
           this.$input.filter('[name="hour"]').val(value.hour);
           this.$input.filter('[name="min"]').val(value.min);
           this.$input.filter('[name="sec"]').val(value.sec);
       },       
       
       /**
        Returns value of input.
        
        @method input2value() 
       **/          
       input2value: function() { 
           return {
              hour: this.$input.filter('[name="hour"]').val(),
              min: this.$input.filter('[name="min"]').val(),
              sec: this.$input.filter('[name="sec"]').val()
           };
       },        
       
        /**
        Activates input: sets focus on the first field.
        
        @method activate() 
       **/        
       activate: function() {
            this.$input.filter('[name="hour"]').focus();
       },  
       
       /**
        Attaches handler to submit form in case of 'showbuttons=false' mode
        
        @method autosubmit() 
       **/       
       autosubmit: function() {
           this.$input.keydown(function (e) {
                if (e.which === 13) {
                    $(this).closest('form').submit();
                }
           });
       }       
    });

    Timer.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl:    '<div class="editable-timer floatleft"><label><span><i class="fa fa-clock-o fa-fw"></i>H</span>'+
                    '<input type="number" min="0" max="24" name="hour"></input>'+
                '</label></div>'+
                '<div class="editable-timer floatleft"><label><span><i class="fa fa-clock-o fa-fw"></i>M</span>'+
                    '<input type="number" min="0" max="59" name="min"></input>'+
                '</label></div>'+
                '<div class="editable-timer floatleft"><label><span><i class="fa fa-clock-o fa-fw"></i>S</span>'+
                    '<input type="number" min="0" max="59" name="sec"></input>'+
                '</label></div>',
             
        inputclass: ''
    });

    $.fn.editabletypes.timer = Timer;

}(window.jQuery));