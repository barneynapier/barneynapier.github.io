const path = require("path");
const fs = require("fs");

// const postFolder = path.join(__dirname, "../src/content/posts");

const obsidianPath =
  "/Users/barnabynapier/Library/Mobile Documents/iCloud~md~obsidian/Documents/Knowledge";
const bookFolder = path.join(obsidianPath, "Books/Publish");
const postFolder = path.join(obsidianPath, "Essays/Publish");

function getMetadataIndices(acc, elem, i) {
  if (/^---/.test(elem)) {
    acc.push(i);
  }
  return acc;
}

function parseMetadata({ lines, metadataIndices }) {
  let obj = {};
  if (metadataIndices.length > 0) {
    let metadata = lines.slice(metadataIndices[0] + 1, metadataIndices[1]);
    metadata.forEach((line) => {
      obj[line.split(": ")[0]] = line.split(": ")[1];
    });
    return obj;
  }
}

function parseContent({ lines, metadataIndices }) {
  if (metadataIndices.length > 0) {
    lines = lines.slice(metadataIndices[1] + 1, lines.length);
  }
  return lines.join("\n");
}

function getPost(file) {
  let post;
  try {
    const contents = fs.readFileSync(`${postFolder}/${file}`, "utf8");
    const lines = contents.split("\n");
    const metadataIndices = lines.reduce(getMetadataIndices, []);
    const metadata = parseMetadata({ lines, metadataIndices });
    const content = parseContent({ lines, metadataIndices });
    post = {
      id: metadata.title.toLowerCase().replaceAll(" ", "-"),
      title: metadata.title ? metadata.title : "No title given",
      author: metadata.author ? metadata.author : "No author given",
      date: metadata.date ? metadata.date : "No date given",
      content: content ? content : "No content given",
    };
    return post;
  } catch (err) {
    console.error(err);
  }
}

function getBook(file) {
  let book;
  try {
    const contents = fs.readFileSync(`${bookFolder}/${file}`, "utf8");
    const lines = contents.split("\n");
    const metadataIndices = lines.reduce(getMetadataIndices, []);
    const metadata = parseMetadata({ lines, metadataIndices });
    const content = parseContent({ lines, metadataIndices });
    book = {
      id: metadata.title.toLowerCase().replaceAll(" ", "-"),
      title: metadata.title ? metadata.title : "No title given",
      author: metadata.author ? metadata.author : "No author given",
      date: metadata.date ? metadata.date : "No date given",
      stars: metadata.stars ? metadata.stars : "No stars given",
      isbn: metadata.isbn ? metadata.isbn : "No isbn given",
      content: content ? content : "No content given",
    };
    return book;
  } catch (err) {
    console.error(err);
  }
}

function translatePosts() {
  let postlist = [];
  fs.readdir(postFolder, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      // Get each post
      files.forEach((file, i) => {
        let post = getPost(file);
        postlist.push(post);
        console.log(`Pushed post: ${post.title}`);
        // Sort by date so posts render in correct order
        if (i === files.length - 1) {
          const sortedList = postlist.sort((a, b) => {
            return a.date < b.date ? 1 : -1;
          });
          let data = JSON.stringify(sortedList);
          fs.writeFileSync("../src/posts.json", data);
        }
      });
    }
  });
  return;
}

function translateBooks() {
  let booklist = [];
  fs.readdir(bookFolder, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      // Get each book
      files.forEach((file, i) => {
        let book = getBook(file);
        booklist.push(book);
        console.log(`Pushed book: ${book.title}`);
        // Sort by date so books render in correct order
        if (i === files.length - 1) {
          const sortedList = booklist.sort((a, b) => {
            return a.date < b.date ? 1 : -1;
          });
          let data = JSON.stringify(sortedList);
          fs.writeFileSync("../src/books.json", data);
        }
      });
    }
  });
  return;
}
translatePosts();
// translateBooks();
