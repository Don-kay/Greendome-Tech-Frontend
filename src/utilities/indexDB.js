// const indexDB =
//   window.indexedDB ||
//   window.mozIndexedDB ||
//   window.webkitIndexedDB ||
//   window.msIndexedDB ||
//   window.shimIndexedDB;

// const request = indexDB.open("myToken", 1);

// request.onerror = function (event) {
//   console.error("there is an error");
//   console.error(event);
// };

// request.onupgradeneeded = function () {
//   const db = request.result;
//   const store = db.createObjectStore("token", { keypath: "id" });
//   store.createIndex("mytoken", ["cookie"], { unique: false });
// };

// request.onsuccess = function () {
//   const db = request.result;
//   const transaction = db.transaction("token", "readwrite");

//   const store = transaction.objectStore("token");
//   const tokenIndex = store.index("mytoken");

//   store.put({ id: 1, cookie: "12345678" });

//   const idQuery = store.get(1);
//   const tokenQuery = tokenIndex.getAll();

//   idQuery.onsuccess = function () {
//     console.log("idQuery", idQuery.result);
//   };

//   transaction.oncomplete = function () {
//     db.close();
//   };
// };
