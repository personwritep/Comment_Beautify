// ==UserScript==
// @name        Comment Beautify
// @namespace        http://tampermonkey.net/
// @version        1.2
// @description        コメント送信画面の文末空白行を削除
// @author        Ameba Blog User
// @match        https://comment.ameba.jp/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=ameba.jp
// @noframes
// @grant        none
// @updateURL        https://github.com/personwritep/Comment_Beautify/raw/main/Comment_Beautify.user.js
// @downloadURL        https://github.com/personwritep/Comment_Beautify/raw/main/Comment_Beautify.user.js
// ==/UserScript==


let ua=0;
let agent=window.navigator.userAgent.toLowerCase();
if(agent.indexOf('firefox') > -1){ ua=1; } // Firefoxの場合のフラッグ



let set_posx=get_cookie('item_posx');
let set_posy=get_cookie('item_posy');
if(set_posx<0){
    set_posx=0; }
if(set_posy<0){
    set_posy=0; }
window.moveTo(set_posx, set_posy);
document.cookie='item_posx='+ set_posx +'; Max-Age=5184000';
document.cookie='item_posy='+ set_posy +'; Max-Age=5184000';

let set_sizex=get_cookie('item_sizex');
let set_sizey=get_cookie('item_sizey');
if(set_sizex<534){
    set_sizex=534; }
if(set_sizey<568){
    set_sizey=568; }
window.resizeTo(set_sizex, set_sizey);
document.cookie='item_sizex='+ set_sizex +'; Max-Age=5184000';
document.cookie='item_sizey='+ set_sizey +'; Max-Age=5184000';

let set_color=get_cookie('item_color_set');
if(set_color==0){
    set_color='#f8f8f8'; }
document.cookie='item_color_set='+ set_color +'; Max-Age=5184000';



setTimeout(()=>{
    if(is_login()){
        setup(); }
}, 100);


function is_login(){
    if(document.querySelector('[class$="_not-loggedin"]')){
        return false; }
    else{
        return true; }}


function setup(){

    let help_url='https://ameblo.jp/personwritep/entry-12800578545.html';

    let svg_icon=
        '<svg viewbox="0 0 512 512"><path d="M512 256c0 7-3 13-8 18l-80 '+
        '72C420 350 414 352 408 352c-3 0-7-1-10-2C390 346 384 338 384 '+
        '328V288h-96v96l40-0c9 0 18 6 22 14s2 19-4 26l-72 80C269 509 263 '+
        '512 255 512s-13-3-18-8l-71-80c-6-7-8-17-4-26s12-14 22-14l39 '+
        '0V288H128v40c0 9-6 18-14 22C111 351 107 352 104 352c-6 '+
        '0-12-2-16-6l-80-72C3 269 0 263 0 256s3-13 8-18l80-72C95 160 105 '+
        '158 114 162C122 166 128 175 128 184V224h95V128l-39-0c-9 '+
        '0-18-6-22-14S160 95 166 88l71-80c9-10 27-10 36 0l72 80c6 7 8 17 4 '+
        '26s-12 14-22 14l-40 0V224H384V184c0-9 6-18 14-22c9-4 19-2 26 '+
        '4l80 72C509 243 512 249 512 256z"></path></svg>';

    let help_icon=
        '<svg class="cb_h" height="24" width="26" viewBox="0 0 210 220">'+
        '<path d="M89 22C71 25 54 33 41 46C7 81 11 142 50 171C58 177 '+
        '68 182 78 185C90 188 103 189 115 187C126 185 137 181 146 175'+
        'C155 169 163 162 169 153C190 123 189 80 166 52C147 30 118 18'+
        ' 89 22z" style="fill:#aaa;"></path>'+
        '<path d="M67 77C73 75 78 72 84 70C94 66 114 67 109 83C106 91'+
        ' 98 95 93 101C86 109 83 116 83 126L111 126C112 114 122 108 1'+
        '29 100C137 90 141 76 135 64C127 45 101 45 84 48C80 49 71 50 '+
        '68 54C67 56 67 59 67 61L67 77M85 143L85 166L110 166L110 143L'+
        '85 143z" style="fill:#fff;"></path>'+
        '</svg>';


    let controll=
        '<span id="controll">'+
        '　Position: <i id="pos_sw">'+ svg_icon +'</i>　'+
        'Color: <input id="color_sw" type="color">'+
        '<a href="'+ help_url +'" rel="noopener noreferrer" target="_blank">'+
        help_icon +'</a>'+

        '<style>'+
        '#controll { margin: 3px 10px 0 auto; font-family: Meiryo; } '+
        '#pos_sw { display: inline-block; width: 20px; height: 20px; vertical-align: -2px; '+
        'border: 1px solid #777; cursor: pointer; } '+
        '#pos_sw svg { height: 16px; width: 18px; padding: 1px; fill: #666; } '+
        '#color_sw { width: 24px; height: 28px; border: none; vertical-align: -4px; '+
        'background-color: transparent; cursor: pointer; } '+
        '.cb_h { margin-left: 12px; vertical-align: -7px; cursor: pointer; } '+
        'body { background: '+ set_color +'; } '+
        '[class^="GlobalHeader-module_"][class$="_icon"] { margin-top: 3px; } '+
        '[class^="CommentWebEntry-module_"][class$="_root"] { '+
        'background: rgb(255 255 255 / 60%); } ';

    if(ua==1){
        controll +=
            '#controll { margin: 4px 10px 0 auto; } '+
            '#color_sw { width: 20px; height: 20px; } '; }

    // 以下は ameblo management の styleと重複します
    controll +=
        'body { overflow-x: hidden; overflow-y: hidden; } '+
        '[class^="CommentWebForm-module_"][class$="_contents"] { margin: 1rem 0 0.5em; } '+
        '[class^="CommentWebForm-module_"][class$="_contents-inner"] { '+
        'min-width: 400px; max-width: 671px; } '+
        '@media screen and (max-width: 719px) { '+
        '[class^="CommentWebForm-module_"][class$="_contents-inner"] { '+
        'max-width: calc(100% - 48px); }} '+
        '[class^="CommentWebEntry-module_"][class$="_root"] { '+
        'padding: 4px 16px; border-radius: 6px; } '+
        '[class^="CommentWebEntry-module_"][class$="_container"] { min-height: 100px; } '+
        '[class^="CommentWebEntry-module_"][class$="_image"], '+
        '[class^="CommentWebEntry-module_"][class$="_image"]::after { '+
        'width: 100px; height: 100px; border-radius: 0; } '+
        '[class^="CommentWebForm-module_"][class$="_form"] { margin-top: 1rem; } '+
        '[class^="CommentWebForm-module_"][class$="_field"] { margin-top: 0; } '+
        '#commentText { border-radius: 0; overflow-y: scroll; width: 100% !important; '+
        'height: calc(100Vh - 500px); } '+
        '.spui-TextArea:focus { box-shadow: none; border-color: #2196F3; } '+
        '#commentText::-webkit-scrollbar { width: 15px; } '+
        '#commentText::-webkit-scrollbar-corner { background: #00aaffd6; } '+
        '#commentText::-webkit-scrollbar-thumb { background: #ccc; border: 2px solid #eee; } '+
        '#commentText::-webkit-scrollbar-track { background: #eee; } '+
        '[class^="CommentWebForm-module_"][class$="_field"] { position: relative; } '+
        '[class^="CommentWebForm-module_"][class$="_field"]:has(textarea)::before { '+
        'content: "▲"; font-size: 6px; color: #00aaffd6; '+
        'position: absolute; bottom: 8px; left: 448px; } '+
        '[class^="CommentWebForm-module_"][class$="_field"]:has(textarea)::after { '+
        'content: "▲"; font-size: 6px; color: #00aaffd6; '+
        'position: absolute; bottom: 8px; left: 649px; } '+
        '.spui-InvalidMessage { position: absolute; font-size: 14px; top: -36px; left: 160px; } '+
        '.spui-Button--large { font-family: Meiryo; padding: 8px 16px 5px; border-radius: 6px; } '+
        '.spui-Button--contained { background-color: #009688; } '+
        '.spui-Button--contained:not([disabled]):hover { background-color: #00796b; } '+
        '[class^="CommentWebFooter-module_"][class$="_root"] { '+
        'margin-top: 0; background: #4fbbef; } '+
        '[class^="CommentWebFooter-module_"][class$="_copyrights"] { '+
        ' font-family: Meiryo; padding: 4px 0 3px; } '+
        '</style></span>';

    let header=document.querySelector('header');
    if(header && !header.querySelector('#controll')){
        header.insertAdjacentHTML('beforeend', controll); }


    let color_sw=document.querySelector('#color_sw');
    if(color_sw){
        color_sw.value=set_color;
        color_sw.onchange=function(){
            let body_=document.querySelector('body');
            body_.style.background=color_sw.value;
            document.cookie='item_color_set='+ color_sw.value +'; Max-Age=5184000'; }}


    let pos_sw=document.querySelector('#pos_sw');
    if(pos_sw){
        pos_sw.onclick=function(){
            let result=window.confirm(
                " 🔵 現在のコメントウインドウの「サイズ」と「位置」を記録します\n"+
                "　　➔ 次回も 同じサイズ・位置に このウインドウを表示します");

            if(result){
                document.cookie='item_posx='+ window.screenX +'; Max-Age=5184000';
                document.cookie='item_posy='+ window.screenY +'; Max-Age=5184000';
                document.cookie='item_sizex='+ window.outerWidth +'; Max-Age=5184000';
                document.cookie='item_sizey='+ window.outerHeight +'; Max-Age=5184000'; }}}


    let textarea=document.querySelector('#commentText');
    let send_button=document.querySelector('.spui-Button');
    if(textarea && send_button){
        send_button.addEventListener('mousedown', function(){
            textarea.value=textarea.value.trim(); // 文末の空白行を削除
        }); }

} // setup()



function get_cookie(name){
    let cookie_req=document.cookie.split('; ').find(row=>row.startsWith(name));
    if(cookie_req){
        if(cookie_req.split('=')[1]==null){
            return 0; }
        else{
            return cookie_req.split('=')[1]; }}
    if(!cookie_req){
        return 0; }}



document.addEventListener('click', function(event){
    let elem=document.elementFromPoint(event.clientX, event.clientY);
    let link_a=elem.closest('a');
    if(link_a){
        link_a.setAttribute("target", "_blank");
        link_a.setAttribute("rel", "noopener noreferrer"); }});
