(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{8225:function(e,t,s){Promise.resolve().then(s.bind(s,1327))},1327:function(e,t,s){"use strict";s.r(t),s.d(t,{AppProvider:function(){return r}});var n=s(7437),u=s(3198),o=s(3956);function r(e){let{children:t}=e;return(0,n.jsx)(u.zt,{store:o.h,children:t})}},7272:function(e,t,s){"use strict";s.d(t,{Dw:function(){return d},Ib:function(){return a},TJ:function(){return l},e5:function(){return r}});var n=s(64);let u={isAuth:!1,username:"",uid:"",savedPosts:[]};console.log(u);let o=(0,n.oM)({name:"auth",initialState:u,reducers:{initialCheck:(e,t)=>{let s=t.payload;if(console.log(s.savedPosts),s.username&&s.uid)return{isAuth:!0,username:s.username,uid:s.uid,savedPosts:s.savedPosts}},logOut:()=>u,logIn:(e,t)=>{let s=t.payload;return console.log(s),{isAuth:!0,username:s.username,uid:s.uid,savedPosts:s.savedPosts}},savePost:(e,t)=>{var s;let n=t.payload,u=[...e.savedPosts,n],o=u.toLocaleString();return console.log(n),null===(s=localStorage)||void 0===s||s.setItem("savedPosts",o),{isAuth:e.isAuth,username:e.username,uid:e.uid,savedPosts:u}},unsavePost:(e,t)=>{var s;let n=t.payload,u=e.savedPosts.filter(e=>e!==n),o=u.toLocaleString();return console.log(n),null===(s=localStorage)||void 0===s||s.setItem("savedPosts",o),{isAuth:e.isAuth,username:e.username,uid:e.uid,savedPosts:u}}}}),{initialCheck:r,logIn:a,logOut:i,savePost:l,unsavePost:d}=o.actions;t.ZP=o.reducer},3956:function(e,t,s){"use strict";s.d(t,{C:function(){return a},h:function(){return r}});var n=s(64),u=s(7272),o=s(3198);let r=(0,n.xC)({reducer:{authReducer:u.ZP}}),a=o.v9}},function(e){e.O(0,[713,971,596,744],function(){return e(e.s=8225)}),_N_E=e.O()}]);