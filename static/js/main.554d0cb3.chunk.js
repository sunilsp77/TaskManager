(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,t,a){},32:function(e,t,a){e.exports=a(61)},61:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),c=a(13),r=a.n(c),s=a(12),o=(a(37),a(11)),i=(a(20),a(9)),m=a(8),u=a(15),d=a.n(u);const b=()=>(localStorage.removeItem("token"),localStorage.removeItem("expirationDate"),localStorage.removeItem("userId"),{type:"AUTH_LOGOUT"}),p=(e,t)=>t=>{setTimeout(()=>{t(b())},1e3*e)},E=(e,t,a,n)=>{if(n({type:"AUTH_START"}),t){const l={email:e,password:t,returnSecureToken:!0};let c="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBe0xFmJaDolMCvCYCZbTzSO61V9asQBOg";a||(c="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBe0xFmJaDolMCvCYCZbTzSO61V9asQBOg"),d.a.post(c,l).then(e=>{const t=e.data,a=t.idToken,l=t.localId,c=t.expiresIn,r=new Date((new Date).getTime()+1e3*c);localStorage.setItem("token",a),localStorage.setItem("expirationDate",r),localStorage.setItem("userId",l),n({type:"AUTH_SUCCESS",idToken:a,userId:l}),p(c)}).catch(e=>{console.log(e),n({type:"AUTH_FAIL",error:e.response.data.error})})}else console.log("Passwords do not match")},k=e=>{const t=localStorage.getItem("token");if(t){const a=new Date(localStorage.getItem("expirationDate"));if(a<=new Date)e(b());else{e({type:"AUTH_SUCCESS",idToken:t,userId:localStorage.getItem("userId")}),p((a.getTime()-(new Date).getTime())/1e3)}}else e(b())},g=(e,t)=>{switch(t.type){case"AUTH_START":return Object(i.a)({},e,{error:null,loading:!0});case"AUTH_SUCCESS":return{token:t.idToken,userId:t.userId,error:null,loading:!1};case"AUTH_FAIL":return Object(i.a)({},e,{error:t.error,loading:!1});case"AUTH_LOGOUT":return Object(i.a)({},e,{token:null,userId:null});default:return e}},f=Object(n.createContext)();function h(e){const t=Object(n.useReducer)(g,{token:null,userId:null,error:null,loading:!1}),a=Object(m.a)(t,2),c=a[0],r=a[1];return l.a.createElement(f.Provider,{value:{userData:c,dispatch:r}},e.children)}var v=Object(o.g)(function(e){const t="string"!==typeof(a=e.location.pathname.substring(1,e.location.pathname.length))?"":a.charAt(0).toUpperCase()+a.slice(1);var a;return l.a.createElement("nav",{className:"navbar navbar-dark bg-primary"},l.a.createElement("div",{className:"row col-12 d-flex justify-content-center text-white"},l.a.createElement("span",{className:"h3"},e.title||t)))});function T(){return l.a.createElement("div",{className:"d-flex justify-content-center"},l.a.createElement("div",{className:"spinner-border",role:"status"},l.a.createElement("span",{className:"sr-only"},"Loading...")))}var y=function({text:e}){return l.a.createElement("div",{className:"alert alert-danger alert-dismissible fade show",role:"alert"},l.a.createElement("strong",null,"Error :")," ",e)};function O(e){const t=Object(n.useContext)(f),a=t.userData,c=t.dispatch,r=Object(n.useState)({email:"",password:""}),s=Object(m.a)(r,2),u=s[0],d=s[1],b=Object(n.useState)(!1),p=Object(m.a)(b,2),k=p[0],g=p[1],h=e=>{const t=e.target,a=t.id,n=t.value;d(e=>Object(i.a)({},e,{[a]:n}))};if(a.loading)return l.a.createElement(T,null);let O=null;return a.error&&(O=l.a.createElement(y,{text:a.error.message})),l.a.createElement(l.a.Fragment,null,null!==a.token&&l.a.createElement(o.a,{to:"/tasks"}),l.a.createElement(v,{title:"Authentication"}),l.a.createElement("div",{className:"container d-flex align-items-center flex-column"},O,l.a.createElement("div",{className:"card col-12 col-lg-4 login-card mt-2 hv-center"},l.a.createElement("form",null,l.a.createElement("div",{className:"form-group text-left"},l.a.createElement("label",{htmlFor:"exampleInputEmail1"},"Email address"),l.a.createElement("input",{type:"email",className:"form-control",id:"email","aria-describedby":"emailHelp",placeholder:"Enter email",value:u.email,onChange:h}),l.a.createElement("small",{id:"emailHelp",className:"form-text text-muted"},"We'll never share your email with anyone else.")),l.a.createElement("div",{className:"form-group text-left"},l.a.createElement("label",{htmlFor:"exampleInputPassword1"},"Password"),l.a.createElement("input",{type:"password",className:"form-control",id:"password",placeholder:"Password",value:u.password,onChange:h}))),l.a.createElement("button",{onClick:e=>{e.preventDefault(),E(u.email,u.password,k,c)},type:"submit",className:"btn btn-primary"},k?"REGISTER":"LOG IN"),l.a.createElement("button",{className:"btn btn-link btn-lg",onClick:()=>{g(!k)}},"SWITCH TO ",k?"LOGIN":"REGISTER"))))}var j=a(10);a(60);var N=d.a.create({baseURL:"https://taskmanager-ac119.firebaseio.com/"});const I=Object(n.createContext)();var x=e=>{const t=Object(n.useState)([]),a=Object(m.a)(t,2),c=a[0],r=a[1],s=Object(n.useState)(!1),o=Object(m.a)(s,2),u=o[0],d=o[1],b=Object(n.useState)(null),p=Object(m.a)(b,2),E=p[0],k=p[1],g=Object(n.useContext)(f).userData;Object(n.useEffect)(()=>{g.token&&N.get("./".concat(g.userId,"/tasks.json?auth=")+g.token).then(e=>{const t=[];for(let a in e.data)t.push(Object(i.a)({},e.data[a],{id:a}));r(t)}).catch(e=>{console.log(e)})},[g]);return l.a.createElement(I.Provider,{value:{loading:u,tasks:c,addTask:e=>{d(!0);const t={title:e,blocked:!1,done:!1};N.post("./".concat(g.userId,"/tasks.json?auth=")+g.token,t).then(e=>{t.id=e.data.name,d(!1),r([...c,t]),j.b.success("Task Added successfully")}).catch(e=>{console.log(e),j.b.error("Failed to add task in DB")})},removeTask:e=>{r(c.filter(t=>t.id!==e)),N.delete("./".concat(g.userId,"/tasks/").concat(e,".json?auth=").concat(g.token)).then(e=>{j.b.success("Task deleted successfully")}).catch(e=>{console.log(e),j.b.error("Task could not be deleted from DB")})},clearList:()=>{r([]),N.delete("./".concat(g.userId,"/tasks.json?auth=").concat(g.token)).then(e=>{j.b.success("Cleared list successfully")}).catch(e=>{console.log(e),j.b.error("Could not clear the list from DB")})},findItem:e=>{const t=c.find(t=>t.id===e);k(t)},editTask:(e,t)=>{const a=c.map(a=>a.id===t?Object(i.a)({},a,{title:e}):a);r(a),k(null),N.put("./".concat(g.userId,"/tasks/").concat(t,"/title.json?auth=").concat(g.token),'"'.concat(e,'"')).then(e=>j.b.success("Task updated successfully")).catch(e=>console.log(e))},editItem:E,toggleHandler:(e,t)=>{const a=c.find(t=>t.id===e);a[t]=!a[t];const n=c.map(t=>t.id===e?a:t);r(n),N.put("./".concat(g.userId,"/tasks/").concat(e,".json?auth=").concat(g.token),a).then().catch(e=>console.log(e))}}},e.children)};var C=function(){const e=Object(n.useContext)(f),t=e.userData,a=e.dispatch;return l.a.createElement(l.a.Fragment,null,null===t.token&&l.a.createElement(o.a,{to:"/"}),l.a.createElement(A,{dispatch:a}),l.a.createElement(B,null),l.a.createElement(S,null))};function S(){const e=Object(n.useContext)(I).tasks;return l.a.createElement("div",{className:"container mt-5 "},l.a.createElement("h4",{className:"text-center"},"Your Todos"),e.length?l.a.createElement("ul",{className:"list-group"},e.map(e=>l.a.createElement(w,{task:e,key:e.id}))):l.a.createElement("div",null,"No Tasks for you Today."))}function w({task:e}){let t=null,a=null,n=!1,c=!1,r="Block",s="Done";return e.blocked&&(t={backgroundColor:"Orange",color:"black"},s="Cannot close blocked task",n=!0,r="Unblock"),e.done&&(a={textDecoration:"line-through"},s="Undone",c=!0,r="Task already closed"),l.a.createElement("li",{className:"list-group-item d-flex row"},l.a.createElement("div",{className:"col-sm-9",style:Object(i.a)({},a,{},t)},e.title),l.a.createElement("div",{className:"col-sm-3 px-0 d-flex justify-content-end"},l.a.createElement(D,{task:e,doneButtonTitle:s,disableDoneButton:n,disableBlockButton:c,blockButtonTitle:r})))}function D({task:e,doneButtonTitle:t,disableDoneButton:a,disableBlockButton:c,blockButtonTitle:r}){const s=Object(n.useContext)(I),o=s.removeTask,i=s.findItem,m=s.toggleHandler;return l.a.createElement(l.a.Fragment,null,l.a.createElement("button",{className:"mr-3 task-btn text-primary",title:t,disabled:a,onClick:()=>m(e.id,"done")},e.done?l.a.createElement("i",{className:"fas fa-check-circle"}):l.a.createElement("i",{className:"far fa-check-circle"})),l.a.createElement("button",{className:"task-btn mr-3 text-primary",disabled:c,onClick:()=>m(e.id,"blocked"),title:r},l.a.createElement("i",{className:"fa fa-ban","aria-hidden":"true"})),l.a.createElement("button",{onClick:()=>o(e.id),className:"task-btn mr-3 text-primary",title:"Delete"},l.a.createElement("i",{className:"fas fa-trash-alt"})),l.a.createElement("button",{onClick:()=>i(e.id),className:"task-btn mr-3 text-primary",title:"Edit"},l.a.createElement("i",{className:"fas fa-pen"})))}function A({dispatch:e}){return l.a.createElement(l.a.Fragment,null,l.a.createElement("nav",{className:"navbar bg-primary text-white "},l.a.createElement("h2",{className:"navbar-text "},"Your Tasks"),l.a.createElement("ul",{className:"navbar-nav d-flex justify-content-end align-items-baseline"},l.a.createElement("li",{className:"nav-item"},l.a.createElement("button",{type:"button",className:"btn btn-primary",onClick:()=>(e(b()),l.a.createElement(o.a,{to:"/"}))},"Logout")))))}function B(){const e=Object(n.useContext)(I),t=e.addTask,a=e.clearList,c=e.editItem,r=e.editTask,s=Object(n.useState)(""),o=Object(m.a)(s,2),i=o[0],u=o[1];return Object(n.useEffect)(()=>{c?(u(c.title),document.getElementById("task-input").focus()):u("")},[c]),l.a.createElement("div",{className:"container pt-4"},l.a.createElement("form",{onSubmit:e=>{e.preventDefault(),c?r(i,c.id):(t(i),u(""))}},l.a.createElement("div",{className:"form-group"},l.a.createElement("input",{id:"task-input",onChange:e=>{u(e.target.value)},value:i,type:"search",className:"form-control",placeholder:"Add Task...",required:!0})),l.a.createElement("div",{className:"d-flex justify-content-center"},l.a.createElement("button",{type:"submit",className:"btn btn-primary mr-2"},c?"Edit Task":"Add Task"),l.a.createElement("button",{type:"button",className:"btn btn-danger",onClick:e=>{window.confirm("Are you sure you wish to clear the list?")&&a()}},"Clear List"))))}function U(){const e=Object(n.useContext)(f).dispatch;return Object(n.useEffect)(()=>{k(e)},[e]),l.a.createElement("div",null,l.a.createElement(o.d,null,l.a.createElement(o.b,{exact:!0,path:"/",component:O}),l.a.createElement(o.b,{path:"/tasks",component:C})),l.a.createElement(j.a,{autoClose:3e3,hideProgressBar:!0}))}const H=document.getElementById("root");r.a.render(l.a.createElement(h,null,l.a.createElement(x,null,l.a.createElement(s.a,null,l.a.createElement(l.a.StrictMode,null,l.a.createElement(U,null))))),H)}},[[32,1,2]]]);