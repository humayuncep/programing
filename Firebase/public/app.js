document.addEventListener('DOMContentLoaded', event => {
  const app = firebase.app();
  const db = firebase.firestore();
  // const myPost = db.collection('posts').doc('firstpost');
  // const productsRef = db.collection('products');
  // const query = productsRef.where('items', '>', 5);
  // let output = '';
  // query.get()
  //   .then(products => {
  //     products.forEach(doc => {
  //       const data = doc.data();
  //       output += `Name: ${data.name} and Items: ${data.items} <br/>`;
  //       document.querySelector('#products').innerHTML = output;
  //     })
  //   })
  //   .catch(console.log);
  //
  //
  // myPost.onSnapshot(doc => {
  //   const data = doc.data();
  //   console.log(data);
  //   document.querySelector('#title').innerHTML = data.title;
  // });
});


/*-----------------------------------------------
|   Update Post
-----------------------------------------------*/
// function updatePost(e) {
//   const db = firebase.firestore();
//   const myPost =  db.collection('posts').doc('firstpost');
//   myPost.update({
//     title: e.target.value,
//   })
// }


/*-----------------------------------------------
|   Google Authentication
-----------------------------------------------*/
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then( result => {
      const user = result.user;
      console.log(result.additionalUserInfo);
      const welcomeTemplate = `
        <h1>Welcome back ${user.displayName}</h1>
        
      `;
      document.write(`Hello, ${user.displayName}`);
    })
    .catch(console.log);
}
