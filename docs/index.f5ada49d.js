const e={imageSelection:document.getElementById("image-selection"),createAccountButton:document.getElementById("create-account-button"),submitButton:document.getElementById("submit-button"),usernameInput:document.getElementById("username"),passwordInput:document.getElementById("password"),form:document.getElementById("form"),errorMessage:document.createElement("p"),userDeletedSuccessfully:document.createElement("h1"),failedToDeleteUser:document.createElement("h1"),messageInput:document.createElement("input"),listItem:document.createElement("li"),body:document.getElementById("body"),accountCreated:document.createElement("h1"),logInpage:document.getElementById("logInpage"),container:document.getElementById("container"),currentUser:document.getElementById("current-user"),statusUpdates:document.getElementById("status-updates"),newStatusUpdate:document.getElementById("new-status-update"),addStatusUpdate:document.getElementById("add-status-update"),loggedInUsersList:document.querySelector(".js-logged-in-users-list"),otherUserPageHeader:document.querySelector(".js-other-user-page-header"),deleteAccount:document.getElementById("delete-account"),deleteAccountButton:document.getElementById("delete-account-button"),statusInput:document.getElementById("status-input"),statusUpdateButton:document.getElementById("status-update-button"),otherUserPage:document.getElementById("other-user-page"),loggedInUsersPage:document.getElementById("logged-in-users-page"),statusUpdatesList:document.getElementById("status-updates-list"),submitStatus:document.getElementById("submit-status"),allUsersList:document.getElementById("allUsersList"),userStatus:document.getElementById("userStatus")};e.logInpage&&(e.logInpage.style.display="block"),e.container.style.display="none",e.body.appendChild(e.container);document.createElement("div").className="error-message";const t="https://social-media-68d76-default-rtdb.europe-west1.firebasedatabase.app/";async function s(){try{const e=await fetch(`${t}users.json`);if(!e.ok)throw new Error(`Error: ${e.status} ${e.statusText}`);const s=await e.json();if(!s)return[];return Object.values(s)}catch(e){throw new Error("Failed to fetch users")}}async function n(e){await s();const n=`${t}users/${e.userName}.json`,a={method:"PUT",body:JSON.stringify(e),headers:{"Content-type":"application/json; charset=UTF-8"}};try{const e=await fetch(n,a);if(!e.ok)throw new Error(`Error: ${e.status} ${e.statusText}`)}catch(e){throw console.log(e),new Error("Failed to save user information.")}}async function a(e){const s=`${t}users/${e}.json`,n={method:"DELETE"};try{const e=await fetch(s,n);if(!e.ok)throw new Error(`Error: ${e.status} ${e.statusText}`)}catch(e){throw console.log(e),new Error("Failed to delete user.")}}async function r(){const e=localStorage.getItem("loggedInUser");return e?await o(e):null}async function o(e){return(await s()).find((t=>t.userName===e))||null}async function u(){const t=e.usernameInput.value.trim(),a=e.passwordInput.value.trim();if(t&&a)try{const o=(await s()).find((e=>e.userName===t&&e.password===a));if(o){o.newUser=!1,o.status="logged-in",await n(o),localStorage.setItem("loggedInUser",o.userName),e.logInpage.style.display="none",e.container.style.display="block",e.currentUser?e.currentUser.textContent=`Logged in as: ${o.userName}`:console.error("elements.currentUser is null"),l(),async function(){const t=await s();await r();t.forEach((t=>{const s=document.createElement("li");s.textContent=`${t.userName}:`,e.loggedInUsersList&&e.loggedInUsersList.appendChild(s)}))}(),async function(){const t=await r();t&&(e.userStatus.textContent=`${t.userName}'s status: ${t.status}`)}();document.getElementById("loggedInUserHeader").textContent=`Logged in as: ${o.userName}`}else e.errorMessage.innerHTML="Incorrect username or password. Try again.",e.body.appendChild(e.errorMessage),setTimeout((()=>{e.errorMessage.remove()}),3e3)}catch(t){console.log(t),e.errorMessage.innerHTML="Failed to log in. Try again.",e.body.appendChild(e.errorMessage),setTimeout((()=>{e.errorMessage.remove()}),3e3)}else e.errorMessage.innerHTML="Please enter a username and password.",e.body.appendChild(e.errorMessage),setTimeout((()=>{e.errorMessage.remove()}),3e3)}async function l(){const e=await r();if(e){const t=e.statusUpdates&&e.statusUpdates.slice(-1)[0]||"",s=document.getElementById("loggedInUserHeader");s?s.textContent=`Logged in as: ${e.userName} - Status: ${t}`:console.error("loggedInUserHeader element not found")}}async function d(){try{const t=await s(),n=document.createElement("ul");t.forEach((t=>{const s=document.createElement("li"),a=t.statusUpdates&&t.statusUpdates.slice(-1)[0]||"";s.textContent=`${t.userName} - Last status: ${a}`,s.addEventListener("click",(()=>{!async function(t){const s=await o(t);if(!s)throw new Error("User not found.");e.allUsersPage.style.display="none",e.otherUserPage.style.display="block",e.otherUserPage.querySelector(".username").textContent=s.userName,e.otherUserPage.querySelector(".profile-pic").setAttribute("src",s.imageurl),e.otherUserPage.querySelector(".latest-status-updates").textContent=`Latest Status Update: ${s.statusUpdates&&s.statusUpdates.slice(-1)[0]||"No status updates yet"}`}(t.userName)})),n.appendChild(s)})),e.allUsersList&&(e.allUsersList.innerHTML="",e.allUsersList.appendChild(n))}catch(e){console.log(e.message)}}async function c(){const t=e.usernameInput.value.trim(),n=e.passwordInput.value.trim();if(t&&n)try{const r=(await s()).find((e=>e.userName===t&&e.password===n));r?(await a(r.userName),localStorage.removeItem("loggedInUser"),e.userDeletedSuccessfully.innerHTML="User deleted successfully!",e.body.appendChild(e.userDeletedSuccessfully),setTimeout((()=>{e.userDeletedSuccessfully.remove()}),3e3),e.usernameInput.value="",e.passwordInput.value="",e.container.style.display="none",e.logInpage.style.display="block"):(e.failedToDeleteUser.innerHTML="Failed to delete user. Incorrect username or password.",e.body.appendChild(e.failedToDeleteUser),setTimeout((()=>{e.failedToDeleteUser.remove()}),3e3))}catch(t){console.log(t),e.failedToDeleteUser.innerHTML="Failed to delete user. Try again.",e.body.appendChild(e.failedToDeleteUser),setTimeout((()=>{e.failedToDeleteUser.remove()}),3e3)}else e.errorMessage.innerHTML="Please enter a username and password.",e.body.appendChild(e.errorMessage),setTimeout((()=>{e.errorMessage.remove()}),3e3)}function i(){console.log("Create Account Button: ",e.createAccountButton),console.log("Submit Button: ",e.submitButton),console.log("Delete Account Button: ",e.deleteAccountButton),console.log("Submit Status: ",e.submitStatus),e.createAccountButton.addEventListener("click",(()=>{!async function(){const t=e.usernameInput.value.trim(),a=e.passwordInput.value.trim(),r=e.imageSelection.value.trim();if(t&&a&&r){(await s()).some((e=>e.userName===t));const o={userName:t,password:a,status:"",imageurl:r,newUser:!0,statusUpdates:[]};try{await n(o),e.accountCreated.innerHTML="Account Created!",e.body.appendChild(e.accountCreated),setTimeout((()=>{e.accountCreated.remove()}),3e3)}catch(t){console.log(t),e.errorMessage.innerHTML="Failed to create account. Try again.",e.body.appendChild(e.errorMessage),setTimeout((()=>{e.errorMessage.remove()}),3e3)}}else e.errorMessage.innerHTML="Please fill in all fields.",e.body.appendChild(e.errorMessage),setTimeout((()=>{e.errorMessage.remove()}),3e3)}()})),e.submitButton.addEventListener("click",(e=>{e.preventDefault(),u()})),e.deleteAccountButton.addEventListener("click",(()=>{c()})),e.submitStatus.addEventListener("click",(t=>{t.preventDefault(),async function(){const t=e.statusInput.value.trim();if(t)try{const s=await r();s?(s.statusUpdates||(s.statusUpdates=[]),s.statusUpdates.push(t),await n(s),e.statusInput.value="",l(),d()):(e.errorMessage.innerHTML="Failed to find the current user.",e.body.appendChild(e.errorMessage),setTimeout((()=>{e.errorMessage.remove()}),3e3))}catch(t){console.log(t),e.errorMessage.innerHTML="Failed to update status. Try again.",e.body.appendChild(e.errorMessage),setTimeout((()=>{e.errorMessage.remove()}),3e3)}else e.errorMessage.innerHTML="Please enter a status update.",e.body.appendChild(e.errorMessage),setTimeout((()=>{e.errorMessage.remove()}),3e3)}()})),document.getElementById("backToAllUsers").addEventListener("click",(()=>{e.otherUserPage.style.display="none",e.allUsersPage.style.display="block"}))}!async function(){document.addEventListener("DOMContentLoaded",(async()=>{i(),await d()}))}();
//# sourceMappingURL=index.f5ada49d.js.map
