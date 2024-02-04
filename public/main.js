const path = require("path");
const fs = require("fs");

const basePath = "../src";
const postFolder = path.join(basePath, "Posts");

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
  lines = lines.join("\n");
  // Remove obsidian links from content
  lines = lines.replaceAll("[[", "");
  lines = lines.replaceAll("]]", "");
  lines = lines.replaceAll("==", "*");
  return lines;
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
          const sortedList = postlist.sort(
            (a, b) => b.date.replaceAll("-", "") - a.date.replaceAll("-", "")
          );
          let data = JSON.stringify(sortedList);
          fs.writeFileSync("../src/posts.json", data);
        }
      });
    }
  });
  return;
}
translatePosts();
