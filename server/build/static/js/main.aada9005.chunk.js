(this.webpackJsonppixelshare=this.webpackJsonppixelshare||[]).push([[0],{122:function(e,t,a){e.exports=a.p+"static/media/1.a282b009.jpg"},124:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),o=a(24),c=a.n(o),r=(a(89),a(5)),m=a(7),s=a(9),i=(a(90),a(68)),u=a(48),d=a.n(u);a(93),a(95);d.a.initializeApp({apiKey:"AIzaSyA7f27Iu24JjQOd7wp4hK-VzGwYah0nsTo",authDomain:"pixelshare-dee1b.firebaseapp.com",databaseURL:"https://pixelshare-dee1b.firebaseio.com",projectId:"pixelshare-dee1b",storageBucket:"pixelshare-dee1b.appspot.com",messagingSenderId:"179184967306",appId:"1:179184967306:web:8008f9f3c1fc2ac0931773",measurementId:"G-FMBPRG8J4X"});var p=d.a.auth(),f=l.a.createContext(),h=l.a.createContext(!1),E=a(131),g=a(126),b=a(127),v=a(130),j=a(74),y=l.a.memo((function(e){var t=e.pageTitle,a=e.children,o=e.customWidth,c=Object(s.e)(),u=Object(n.useState)(null),d=Object(r.a)(u,2),h=d[0],y=d[1],O=Object(n.useContext)(f),w=Object(r.a)(O,2),x=(w[0],w[1]);p.onAuthStateChanged((function(e){e?y(e):console.log("Not logged in")})),Object(n.useEffect)((function(){(null===h||void 0===h?void 0:h.displayName)?(x((function(e){return{user:h.displayName}})),console.log("effect")):(console.log("effect2"),x((function(e){return{user:null}})))}),[h]);return l.a.createElement(l.a.Fragment,null,l.a.createElement(i.a,{title:t?"Pixelshare | ".concat(t):"Pixelshare",defer:!1}),l.a.createElement(E.a,{bg:"light",expand:"md",fixed:"top"},l.a.createElement(g.a,{style:{width:"80%"}},l.a.createElement(b.a,null,l.a.createElement(E.a.Brand,{href:"/"},"Pixelshare")),l.a.createElement(E.a.Toggle,{"aria-controls":"basic-navbar-nav"}),l.a.createElement(E.a.Collapse,{id:"basic-navbar-nav"},l.a.createElement(v.a,{className:"ml-auto"},l.a.createElement(b.a,null,l.a.createElement(m.c,{to:"/",exact:!0,className:"mr-2 mr-md-3",activeClassName:"mr-2 mr-md-3 font-weight-bold"},"Home"),l.a.createElement(m.c,{to:"/upload",className:"mr-2 mr-md-3",activeClassName:"mr-2 mr-md-3 font-weight-bold"},"Upload"),h&&l.a.createElement(m.c,{to:"/user/".concat(null===h||void 0===h?void 0:h.displayName),className:"mr-2 mr-md-3",activeClassName:"mr-2 mr-md-3 font-weight-bold"},null===h||void 0===h?void 0:h.displayName),h?l.a.createElement(m.b,{to:"#",onClick:function(){p.signOut().then((function(){y(null),console.log("You were logged out..."),c.push("/")})).catch((function(e){console.log(e)}))}},"Log out"):l.a.createElement(m.c,{to:"/login",activeClassName:"font-weight-bold"},"Login")))))),l.a.createElement("div",{style:{display:"flex",flexDirection:"column",minHeight:"calc(100vh)"}},l.a.createElement("div",{style:{flex:1}},l.a.createElement("div",{className:"h-100"},l.a.createElement(j.a,{xs:12,md:11,lg:o||5,className:"mt-5 mx-auto"},a))),l.a.createElement(E.a,{className:"mt-3",bg:"light"},l.a.createElement(g.a,null,l.a.createElement(b.a,{className:"mx-auto"},l.a.createElement(j.a,null,l.a.createElement("a",{href:"https://georgelam.dev"},"George Lam")," - 2020"))))))})),O=a(8),w=a.n(O),x=a(28),N=a(33),C=a(26),S=a.n(C),k=l.a.memo((function(e){console.log(e.fileName);var t=Object(s.e)(),o=Object(n.useContext)(f),c=Object(r.a)(o,2),i=c[0];c[1];console.log(i.user),console.log(e);return l.a.createElement("div",{className:"d-flex flex-row ".concat(e.comment&&"mb-3 px-3 py-2")},l.a.createElement("div",{style:{flex:1,display:"flex"}},l.a.createElement(m.b,{to:"/user/".concat(e.author)},l.a.createElement("img",{src:"https://pixelshare.s3.amazonaws.com/".concat(e.author),className:"rounded-circle mr-3 profilePhoto",alt:"user's profile picture",width:"30",height:"30"})),l.a.createElement("div",{className:"d-flex flex-column",style:{fontSize:e.comment?"0.8em":"1em"}},l.a.createElement(m.b,{to:"/user/".concat(e.author),className:S.a.username,style:{color:"black",textDecoration:"none"}},e.author),e.comment&&l.a.createElement(l.a.Fragment,null," ",l.a.createElement("span",null,e.comment),l.a.createElement("span",{style:{fontSize:10,color:"gray"}},Object(x.a)(e.commentTime).toUpperCase())))),l.a.createElement("div",null,e.author==i.user&&e.comment&&!e.caption&&l.a.createElement("span",{onClick:function(){var t,a;window.confirm("Confirm comment deletion?")&&(t=e.commentTime,a=e.author,console.log("Deleting",t,a),w.a.post("/photoUpdate/",{queryType:"commentDelete",fileName:e.fileName,commentTime:t,author:a}).then((function(t){console.log(t.data),e.setCommentsArray(t.data.comments)})).catch((function(e){console.log(e)})))}},l.a.createElement("img",{src:a(65),style:{height:" 30%",cursor:"pointer"}})),e.author==i.user&&!e.comment&&!e.caption&&l.a.createElement("span",{onClick:function(){var a;window.confirm("Confirm photo deletion?")&&(a=e.fileName,console.log("Deleting",a),w.a.post("/photoUpdate/",{queryType:"photoDelete",fileName:a}).then((function(e){console.log(e.data),e.data.deletedCount&&(alert("Photo has been deleted!"),t.push("/"))})).catch((function(e){console.log(e)})))}},l.a.createElement("img",{src:a(65),style:{height:" 30%",cursor:"pointer"}}))))})),P=l.a.memo((function(e){var t,a,o,c,i=Object(s.e)(),u=Object(n.useContext)(f),d=Object(r.a)(u,2),p=d[0],E=(d[1],Object(n.useContext)(h)),g=Object(r.a)(E,2);g[0],g[1];console.log(null===e||void 0===e||null===(t=e.data)||void 0===t||null===(a=t.likes)||void 0===a?void 0:a.includes(p.user));var b=Object(n.useState)(e.data.likes||[]),v=Object(r.a)(b,2),j=v[0],y=v[1],O=Object(n.useState)(null===e||void 0===e||null===(o=e.data)||void 0===o||null===(c=o.likes)||void 0===c?void 0:c.includes(p.user)),x=Object(r.a)(O,2),N=x[0],C=x[1],S=Object(n.useRef)();return l.a.createElement("div",null,l.a.createElement("div",{className:"d-flex flex-row",style:{color:"black",fontSize:11}},l.a.createElement(m.b,{to:"#",className:"mr-2",onClick:function(){p.user?(console.log("Liking",p),console.log(S),C(!N),w.a.post("/photoUpdate/",{queryType:"like",fileName:e.data.fileName,currentUser:p.user,likeStatus:N}).then((function(e){console.log(e.data),y(e.data.likes)})).catch((function(e){console.log(e)}))):i.push("/login")}},N?l.a.createElement("span",null,"Unlike"):l.a.createElement("span",null,"Like")),l.a.createElement(m.b,{onClick:function(){p.user?i.push("/p/".concat(e.data.fileName)):i.push("/login")}},"Comment")),l.a.createElement("div",null,(null===j||void 0===j?void 0:j.length)?l.a.createElement(l.a.Fragment,null," ",l.a.createElement("span",{ref:S},"Liked by "),j.map((function(e,t){return l.a.createElement(l.a.Fragment,null,t?", ":"",l.a.createElement("strong",null,l.a.createElement(m.b,{style:{color:"black"},to:"/user/".concat(e)},e)))}))):l.a.createElement("span",null)))})),T=function(e){var t=Object(s.e)();console.log(e.commentsArray);var a=Object(n.useContext)(f),o=Object(r.a)(a,2),c=o[0],i=(o[1],Object(n.useState)(e.commentsArray||[])),u=Object(r.a)(i,2),d=u[0];u[1];Object(n.useEffect)((function(){console.log(d)}),[d]);var p=Object(n.useRef)();return l.a.createElement("div",{style:{width:"100%",display:"flex",flexDirection:"row",borderTop:"1px solid rgba(0,0,0,0.1)"}},l.a.createElement("textarea",{placeholder:"Add a comment...",ref:p,style:{width:"100%",overflow:"auto",border:"none",resize:"none",height:40,padding:"0.4em 0.8em"}}),l.a.createElement(m.b,{to:"#",style:{padding:"0.4em 0.7em"},onClick:function(){c.user?(console.log("Posting",c),console.log(p.current.value),w.a.post("/photoUpdate/",{queryType:"comment",commentValue:p.current.value,fileName:e.data.fileName,currentUser:c.user}).then((function(t){console.log(t.data),p.current.value="",e.setCommentsArray(t.data.comments)})).catch((function(e){console.log(e)}))):t.push("/login")}},"Post"))},U=l.a.memo((function(e){var t=e.photo;console.log("ajaja",t);var a=Object(n.useState)(t.comments||[]),o=Object(r.a)(a,2),c=o[0],s=o[1];return l.a.createElement(N.a,{key:t._id,style:{width:"100%"},className:"my-5"},l.a.createElement(N.a.Header,null,l.a.createElement(k,{author:t.author,fileName:t.fileName})),l.a.createElement("img",{variant:"top",src:"https://pixelshare.s3.eu-west-2.amazonaws.com/"+t.fileName,alt:"Photo uploaded by ".concat(t.author),style:{maxHeight:500,objectFit:"cover",width:"100%"}}),l.a.createElement(N.a.Body,null,l.a.createElement(P,{data:t}),l.a.createElement(N.a.Text,{className:"mt-1"},(null===t||void 0===t?void 0:t.caption)&&l.a.createElement("span",null,null===t||void 0===t?void 0:t.caption),l.a.createElement("ul",{style:{margin:0,padding:0}},(null===c||void 0===c?void 0:c.length)>2&&l.a.createElement(m.b,{to:"/p/".concat(null===t||void 0===t?void 0:t.fileName),style:{color:"gray",fontWeight:400}},"See all ",null===c||void 0===c?void 0:c.length," comments"),(null===c||void 0===c?void 0:c.length)?null===c||void 0===c?void 0:c.slice(c.length-2).map((function(e){return l.a.createElement("li",{style:{listStyle:"none"}},l.a.createElement("strong",{className:"mr-1"},l.a.createElement(m.b,{style:{color:"black"},to:"/user/".concat(e.user)},e.user)),e.comment)})):l.a.createElement(l.a.Fragment,null)),l.a.createElement("span",{style:{fontSize:10}},l.a.createElement(m.b,{to:"/p/".concat(t.fileName),style:{color:"gray"}},Object(x.a)(t.uploadTime).toUpperCase())))),l.a.createElement("div",null,l.a.createElement(T,{style:{width:"100%"},data:t,commentsArray:c,setCommentsArray:s})))})),I=(a(67),a(76)),L=a.n(I),F=function(){return l.a.createElement("div",{className:"my-5 text-center"},l.a.createElement("div",{className:"mb-2"},"Loading ..."),l.a.createElement("div",null,l.a.createElement("div",{className:"sweet-loading"},l.a.createElement(L.a,{style:{display:"block",margin:"0 auto"},size:150,color:"#123abc",loading:1}))))},A=l.a.memo((function(){console.log("IMAGE COMP RENDERING");var e=Object(n.useState)(3),t=Object(r.a)(e,2),a=(t[0],t[1],Object(n.useState)()),o=Object(r.a)(a,2),c=o[0],s=o[1],i=Object(n.useState)([]),u=Object(r.a)(i,2),d=(u[0],u[1],Object(n.useState)("recent")),p=Object(r.a)(d,2),f=p[0],h=p[1];return Object(n.useEffect)((function(){w.a.post("/photos",{queryType:f}).then((function(e){console.log(e.data),s(e.data)})).catch((function(e){console.log(e)}))}),[f]),l.a.createElement("div",null,c?l.a.createElement(l.a.Fragment,null,null===c||void 0===c?void 0:c.slice(0,100).map((function(e,t){return l.a.createElement(U,{photo:e})})),l.a.createElement("span",{className:"d-flex justify-content-center mb-3"},l.a.createElement(m.b,{to:"#",onClick:function(){h("moreRecentPhotos")}},"Load more photos..."))):l.a.createElement(l.a.Fragment,null,l.a.createElement(F,null)))})),R=function(){return l.a.createElement(y,{pageTitle:"Home",customWidth:4},l.a.createElement(g.a,null,l.a.createElement(b.a,null,l.a.createElement(j.a,{xs:12,className:"mx-auto"},l.a.createElement(A,null)))))},z=a(129),D=a(121),H=function(){var e=Object(s.e)(),t=Object(n.useState)(),a=Object(r.a)(t,2),o=a[0],c=a[1],m=Object(n.useState)(),i=Object(r.a)(m,2),u=i[0],d=i[1],f=Object(n.useState)(),h=Object(r.a)(f,2),E=h[0],g=h[1],b=Object(n.useState)(),v=Object(r.a)(b,2),j=v[0],y=v[1];return l.a.createElement("div",null,l.a.createElement(N.a,{style:{width:"100%"},className:"my-5"},l.a.createElement(N.a.Header,null,l.a.createElement("span",{className:"text-center"},"Sign Up")),l.a.createElement(N.a.Body,null,l.a.createElement(z.a,{className:"mx-auto mb-3",style:{width:"80%"}},l.a.createElement(z.a.Group,{controlId:"formEmail"},l.a.createElement(z.a.Label,null,"Email"),l.a.createElement(z.a.Control,{defaultValue:o,onChange:function(e){c(e.target.value)},type:"email",placeholder:"Enter email"})),l.a.createElement(z.a.Group,{controlId:"formUsername"},l.a.createElement(z.a.Label,null,"Username"),l.a.createElement(z.a.Control,{defaultValue:u,onChange:function(e){d(e.target.value)},type:"username",placeholder:"Enter username"})),l.a.createElement(z.a.Group,{controlId:"formPassword"},l.a.createElement(z.a.Label,null,"Password"),l.a.createElement(z.a.Control,{defaultValue:E,onChange:function(e){g(e.target.value)},type:"password",placeholder:"Password"})),l.a.createElement(z.a.Group,{controlId:"formPasswordConfirm"},l.a.createElement(z.a.Label,null,"Confirm Password"),l.a.createElement(z.a.Control,{defaultValue:j,onChange:function(e){y(e.target.value)},type:"password",placeholder:"Confirm your password"})),l.a.createElement(D.a,{variant:"primary",type:"button",className:"w-100",onClick:function(){p.createUserWithEmailAndPassword(o,E).then((function(e){return p.currentUser.updateProfile({displayName:u})})).then((function(){console.log("Logged in..."),e.push("/")})).catch((function(e){console.log(e)}))}},"Submit"))," ")))},B=function(){var e=Object(s.e)(),t=Object(n.useState)(),a=Object(r.a)(t,2),o=a[0],c=a[1],m=Object(n.useState)(),i=Object(r.a)(m,2),u=i[0],d=i[1],f=function(){p.signInWithEmailAndPassword(o,u).then((function(){console.log("Logged in..."),e.push("/")})).catch((function(e){e.code,e.message;console.log(e)}))};return l.a.createElement("div",null,l.a.createElement(N.a,{style:{width:"100%"},className:"my-5"},l.a.createElement(N.a.Header,null,l.a.createElement("span",{className:"text-center"},"Sign In")),l.a.createElement(N.a.Body,null,l.a.createElement(z.a,{className:"mx-auto mb-3",style:{width:"80%"},onSubmit:f,id:"signInForm"},l.a.createElement(z.a.Group,{controlId:"formEmail"},l.a.createElement(z.a.Label,null,"Email"),l.a.createElement(z.a.Control,{defaultValue:o,onChange:function(e){c(e.target.value)},type:"email",placeholder:"Enter email"})),l.a.createElement(z.a.Group,{controlId:"formPassword"},l.a.createElement(z.a.Label,null,"Password"),l.a.createElement(z.a.Control,{defaultValue:u,onChange:function(e){d(e.target.value)},type:"password",placeholder:"Password"})),l.a.createElement(D.a,{variant:"primary",type:"button",className:"w-100",onClick:f,form:"signInForm"},"Submit"))," ")))},W=function(){p.onAuthStateChanged((function(e){e?console.log("User currently logged in",e):console.log("Not logged in")}));var e=Object(n.useState)(!0),t=Object(r.a)(e,2),a=t[0],o=t[1];return l.a.createElement(y,{customWidth:10},l.a.createElement(g.a,null,l.a.createElement(b.a,null,l.a.createElement(j.a,{xs:12,md:8,lg:5,className:"mx-auto"},a?l.a.createElement(B,null):l.a.createElement(H,null),l.a.createElement("p",{className:"text-center"},"Click"," ",l.a.createElement(m.b,{to:"#",onClick:function(){o(!a)}},"here")," ","to ",a?"sign up":"sign in")))),l.a.createElement(b.a,null))},G=a(128),_=function(e){var t;e.data?e.data:a(122);console.log("!!!",e.data);Object(s.e)();var o=Object(n.useContext)(f),c=Object(r.a)(o,2),i=(c[0],c[1],Object(n.useState)(e.data.comments||[])),u=Object(r.a)(i,2),d=u[0],p=u[1];Object(n.useRef)();Object(n.useEffect)((function(){console.log(d)}),[d]);return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{style:{flex:1}},l.a.createElement("img",{src:"https://pixelshare.s3.eu-west-2.amazonaws.com/"+e.data.fileName,style:{maxHeight:600,objectFit:"cover",width:"100%",height:"100%"}})," "),l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"d-flex flex-column",style:{backgroundColor:"white"}},l.a.createElement("div",{style:{borderBottom:"1px solid rgba(0,0,0,0.1)",padding:"0.8em"}},l.a.createElement(k,{author:e.data.author,fileName:e.data.fileName})),l.a.createElement("div",{style:{borderBottom:"1px solid rgba(0,0,0,0.1)",height:"75%",overflowY:"auto"}},l.a.createElement("div",null,(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.caption)&&l.a.createElement(k,{author:e.data.author,comment:e.data.caption,commentTime:e.data.uploadTime,caption:1}),(null===d||void 0===d?void 0:d.length)?null===d||void 0===d?void 0:d.map((function(t){return l.a.createElement(k,{author:t.user,comment:t.comment,commentTime:t.commentTime,fileName:e.data.fileName,deleteComment:1,setCommentsArray:function(e){console.log("sca"),p(e)}})})):l.a.createElement("span",{className:"p-2"}))),l.a.createElement("div",{style:{padding:"0.8em"}},l.a.createElement(P,{data:e.data}),l.a.createElement("span",{style:{fontSize:10}},l.a.createElement(m.b,{to:"/p/".concat(e.data.fileName),style:{color:"gray"}},Object(x.a)(e.data.uploadTime).toUpperCase()))),l.a.createElement("div",null,l.a.createElement(T,{data:e.data,commentsArray:d,setCommentsArray:p})))))},M=function(e){var t=window.outerWidth,a=Object(n.useContext)(h),o=Object(r.a)(a,2),c=o[0];o[1];console.log(c);var m=Object(n.useState)(e.show),s=Object(r.a)(m,2);s[0],s[1];return l.a.createElement("div",{style:{borderRadius:"0"}},l.a.createElement(G.a,{show:e.show,onHide:e.handleClose,dialogClassName:"modal-90w"},l.a.createElement(G.a.Body,{className:"d-flex ".concat(t<=1024?"flex-column":"flex-row"),style:{padding:0,borderRadius:0}},l.a.createElement(_,{data:e.data}))))},V=a(81),q=a(52),X=a.n(q),Y=a(82),J=a(83),Z=a.n(J),K=(a(66),function(e){var t=e.type,a=Object(n.useContext)(f),o=Object(r.a)(a,2),c=o[0],m=(o[1],Object(s.e)()),i=Object(n.useRef)(null),u=Object(n.useState)(),d=Object(r.a)(u,2),p=d[0],h=d[1],E=Object(n.useState)(),g=Object(r.a)(E,2),b=(g[0],g[1]),v=Object(n.useState)(),j=Object(r.a)(v,2),y=j[0],O=j[1],x=Object(n.useState)(),N=Object(r.a)(x,2),C=(N[0],N[1],function(){var e=Object(Y.a)(X.a.mark((function e(t){var a,n,l;return X.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),console.log(t.target.files),"image"===(null===t||void 0===t||null===(a=t.target)||void 0===a||null===(n=a.files[0])||void 0===n||null===(l=n.type)||void 0===l?void 0:l.slice(0,5))){e.next=8;break}return h(0),alert("File type unsupported - please only upload images"),e.abrupt("return");case 8:console.log(window.URL.createObjectURL(t.target.files[0])),O(window.URL.createObjectURL(t.target.files[0])),h(1);case 11:b(t.target.files[0]);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),S=Object(n.useState)(Object(V.a)({unit:"px",x:130,y:50,width:50,height:50,aspect:1,maxHeight:1200,maxWidth:1200,minHeight:500},"minHeight",500)),k=Object(r.a)(S,2),P=k[0],T=k[1],U=Object(n.useState)(null),I=Object(r.a)(U,2),L=(I[0],I[1],Object(n.useState)(null)),F=Object(r.a)(L,2),A=F[0],R=F[1],z=Object(n.useState)(null),D=Object(r.a)(z,2),H=D[0],B=D[1],W=Object(n.useState)(null),G=Object(r.a)(W,2),_=(G[0],G[1]),M=function(e,t){var a=document.createElement("canvas"),n=e.naturalWidth/e.width,l=e.naturalHeight/e.height;a.width=t.width,a.height=t.height,a.getContext("2d").drawImage(e,t.x*n,t.y*l,t.width*n*2,t.height*l*2,0,0,2*t.width,2*t.height);new FileReader;a.toBlob((function(e){console.log(e),B(e)}))};return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"col text-center"},l.a.createElement("p",null,H&&"Image preview: ".concat(H.size/1e3," kb")),y&&l.a.createElement(l.a.Fragment,null,l.a.createElement(Z.a,{crop:P,src:y,onImageLoaded:function(e){R(e)},onComplete:function(e){if(A&&e.width&&e.height){var t=M(A,e);_(t)}},onChange:function(e){console.log("Changed!"),T(e)}}))),l.a.createElement("div",{className:"col text-center"},c.user?l.a.createElement(l.a.Fragment,null,l.a.createElement("form",{method:"post",encType:"multipart/form-data",id:"#",onSubmit:function(e){if(e.preventDefault(),console.log(H),H.size>4e5)alert("File too large - please select images under 400kb");else{var a=new FormData;a.append("imageUpload",H),t||(a.append("caption",i.current.value),a.append("authorName",c.user)),t&&(a.append("type",t),a.append("username",c.user)),w.a.post("/api",a,{headers:{encType:"multipart/form-data","Content-Type":"application/x-www-form-urlencoded","Access-Control-Allow-Origin":"*"}}).then((function(e){if(console.log(e),t&&alert("Profile photo will take around a minute to update"),"error"in(null===e||void 0===e?void 0:e.data))return alert(e.data.error),void(t||m.push("/"));"success"in(null===e||void 0===e?void 0:e.data)&&!t&&setTimeout((function(){O(e.data.location),alert("Image uploaded!"),t||m.push("/")}),1e3)})).catch((function(e){console.log(e)}))}}},l.a.createElement("div",{className:"form-group files"},l.a.createElement("label",null,"Upload Your File (max: 400kb)"),l.a.createElement("input",{type:"file",className:"form-control",name:"file",multiple:"",onChange:C,accept:"image/*"})),!t&&l.a.createElement("textarea",{style:{width:"100%"},ref:i,placeholder:"Enter a caption..."}),p&&H?l.a.createElement("button",{className:"btn btn-success my-2"},"Upload"):l.a.createElement("button",{className:"btn btn-success",disabled:!0},"Upload"))):"You must log in first!"))}),Q=function(e){var t=Object(s.e)(),a=Object(n.useContext)(f),o=Object(r.a)(a,2),c=o[0],m=(o[1],Object(n.useRef)(null)),i=(window.outerWidth,Object(n.useContext)(h)),u=Object(r.a)(i,2),d=u[0];u[1];console.log(d),console.log("XZXXZXZXZ",c.user);var p=Object(n.useState)(e.show),E=Object(r.a)(p,2),g=(E[0],E[1],Object(n.useState)()),b=Object(r.a)(g,2),v=(b[0],b[1]);return l.a.createElement("div",{style:{borderRadius:"0"}},l.a.createElement(G.a,{show:e.show,onHide:function(){e.handleProfileModalClose()},dialogClassName:"modal-90w"},l.a.createElement(G.a.Header,{closeButton:!0},l.a.createElement(G.a.Title,null,"Edit Profile")),l.a.createElement(G.a.Body,null,l.a.createElement(z.a,{className:"mx-auto mb-3",style:{width:"80%"}},l.a.createElement(z.a.Group,null,l.a.createElement(K,{type:"profilePhoto",setProfilePhotoChanged:function(e){v(e)}})),l.a.createElement(z.a.Group,{controlId:"formEmail"},l.a.createElement(z.a.Label,{for:"bioText"},"Profile Bio"),l.a.createElement("textarea",{placeholder:"Enter a bio",className:"form-control",id:"bioText",rows:"3",ref:m})))),l.a.createElement(G.a.Footer,null,l.a.createElement(D.a,{variant:"secondary"},"Close"),l.a.createElement(D.a,{variant:"primary",onClick:function(){var a={username:c.user,bio:m.current.value};w.a.post("/updateProfile",a).then((function(a){console.log("epm",a.data),e.setProfileData(a.data.value),e.handleProfileModalClose(),t.go(0)})).catch((function(e){console.log(e)}))}},"Save changes"))))},$=l.a.memo((function(e){var t,a=e.match,o=Object(s.e)(),c=window.outerWidth,m=a.params.userID,i=Object(n.useState)(),u=Object(r.a)(i,2),d=u[0],p=u[1],h=Object(n.useState)(),E=Object(r.a)(h,2),v=E[0],O=E[1],x=Object(n.useState)(!1),N=Object(r.a)(x,2),C=N[0],S=N[1],k=Object(n.useState)(),P=Object(r.a)(k,2),T=P[0],U=P[1],I=Object(n.useState)(!1),L=Object(r.a)(I,2),A=L[0],R=L[1];Object(n.useEffect)((function(){w.a.post("/photos/",{queryType:"user",author:m}).then((function(e){console.log(e.data),O(e.data)})).catch((function(e){console.log(e)})),w.a.post("/profile/",{username:m}).then((function(e){console.log(e),p(e.data[0])})).catch((function(e){console.log(e)}))}),[]),Object(n.useEffect)((function(){T&&S(1)}),[T]);var z=Object(n.useContext)(f),H=Object(r.a)(z,2),B=H[0];H[1];return l.a.createElement(y,{pageTitle:m},l.a.createElement(Q,{show:A,handleProfileModalClose:function(){return R(!1)},handleProfileModalShow:function(){return R(!0)},setProfileData:function(e){return p(e)}}),T&&l.a.createElement(M,{show:C,handleClose:function(){return S(!1)},handleShow:function(){return S(!0)},data:T}),l.a.createElement(g.a,null,l.a.createElement(b.a,{className:"mb-5",style:{}},l.a.createElement(j.a,{xs:3,className:"mx-auto mt-5"},l.a.createElement("img",{src:"https://pixelshare.s3.amazonaws.com/".concat(m),alt:"User's profile photo",className:"rounded-circle",style:{height:"80px",width:"80px"}})),l.a.createElement(j.a,{xs:9,className:"mt-5"},l.a.createElement("div",{className:"d-flex align-items-center mb-2"},l.a.createElement("p",{style:{fontSize:"28px",margin:0}},m),(null===m||void 0===m?void 0:m.toLowerCase())==(null===B||void 0===B||null===(t=B.user)||void 0===t?void 0:t.toLowerCase())&&l.a.createElement(D.a,{variant:"outline-secondary ml-3",size:"sm",onClick:function(){return R(!0)}},"Edit profile")),l.a.createElement("span",{className:"mr-2"},l.a.createElement("strong",null,v?null===v||void 0===v?void 0:v.length:"Loading")," ","posts"),l.a.createElement("p",{className:"mt-2"},d&&d.bio))),l.a.createElement(b.a,null),l.a.createElement(b.a,{style:{}},l.a.createElement("div",{class:"grid-container"},v?null===v||void 0===v?void 0:v.map((function(e,t){return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",null,l.a.createElement("img",{onClick:function(){c<768&&o.push("/p/".concat(e.fileName)),U(v[t]),console.log("Hi")},className:" img-responsive full-width ",src:"https://pixelshare.s3.amazonaws.com/".concat(e.fileName),alt:"Photo uploaded by ".concat(e.author),style:{width:"100%",objectFit:"cover",maxWidth:200}})))})):l.a.createElement("div",{style:{position:"absolute",left:"25%",right:"25%"}},l.a.createElement(F,null))))),l.a.createElement(b.a,null))})),ee=function(e){var t=e.match.params.fileName,a=Object(n.useState)(),o=Object(r.a)(a,2),c=o[0],m=o[1],s=Object(n.useState)(!1),i=Object(r.a)(s,2);i[0],i[1];return Object(n.useEffect)((function(){w.a.post("/photos/",{queryType:"single",fileName:t}).then((function(e){console.log(e.data),m(e.data[0])})).catch((function(e){console.log(e)}))}),[]),l.a.createElement(y,{customWidth:"8"},l.a.createElement(g.a,null,l.a.createElement(b.a,null,l.a.createElement(j.a,{className:"mt-5"},l.a.createElement("div",{className:"d-flex flex-column flex-md-row mb-3",style:{display:"flex",flexDirection:"row",justifyContent:"center",padding:0,borderRadius:0,width:"100%",margin:"0 auto",border:"1px solid rgba(0,0,0,0.1)"}},c?l.a.createElement(_,{data:c}):l.a.createElement(F,null))))),l.a.createElement(b.a,null))},te=function(){return l.a.createElement(y,{pageTitle:"Upload"},l.a.createElement("div",null,l.a.createElement("div",{className:"container mt-5 pt-1"},l.a.createElement("div",{className:""},l.a.createElement(K,null)))))};var ae=function(){var e=Object(n.useState)({user:null}),t=Object(r.a)(e,2),a=t[0],o=t[1],c=Object(n.useState)(!0),i=Object(r.a)(c,2),u=i[0],d=i[1];return l.a.createElement("div",null,l.a.createElement(f.Provider,{value:[a,o]},l.a.createElement(h.Provider,{value:[u,d]},l.a.createElement(m.a,null,l.a.createElement(s.a,{path:"/",exact:!0,component:R}),l.a.createElement(s.a,{path:"/upload",exact:!0,component:te}),l.a.createElement(s.a,{path:"/login",exact:!0,component:W}),l.a.createElement(s.a,{path:"/signup",exact:!0,component:W}),l.a.createElement(s.a,{path:"/user/:userID",component:$}),l.a.createElement(s.a,{path:"/p/:fileName",component:ee})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(ae,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},26:function(e,t,a){e.exports={card:"image_card__wyPX5",username:"image_username__ji5El",profilePhoto:"image_profilePhoto__1R2ei"}},65:function(e,t,a){e.exports=a.p+"static/media/trash.740028d4.svg"},84:function(e,t,a){e.exports=a(124)},89:function(e,t,a){},90:function(e,t,a){}},[[84,1,2]]]);
//# sourceMappingURL=main.aada9005.chunk.js.map