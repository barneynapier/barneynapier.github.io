const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

const POSTS_DIRECTORY = path.join(process.cwd(), 'src', 'Posts');
const OUTPUT_FILE = path.join(process.cwd(), 'src', 'posts.json');

async function processMarkdownFiles() {
  try {
    // Read all files from the Posts directory
    const files = await fs.readdir(POSTS_DIRECTORY);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    // Process each markdown file
    const posts = await Promise.all(
      markdownFiles.map(async (filename) => {
        const filePath = path.join(POSTS_DIRECTORY, filename);
        const fileContent = await fs.readFile(filePath, 'utf8');
        
        // Parse frontmatter and content using gray-matter
        const { data: metadata, content } = matter(fileContent);
        
        // Generate a URL-friendly slug from the title
        const slug = metadata.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        // Ensure tags is always an array
        let tags = metadata.tags || [];
        // If tags is a string (single tag), convert it to an array
        if (typeof tags === 'string') {
          tags = [tags];
        }
        // If tags is neither an array nor a string, make it an empty array
        if (!Array.isArray(tags)) {
          tags = [];
        }

        return {
          id: slug,
          title: metadata.title || 'Untitled',
          date: metadata.date ? metadata.date.toISOString().split('T')[0] : 'No date',
          tags: tags,
          content: content.trim(),
          excerpt: content.trim().split('\n')[0].slice(0, 150) + '...',
          lastModified: new Date().toISOString()
        };
      })
    );

    // Sort posts by date (newest first)
    const sortedPosts = posts.sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );

    // Write the processed posts to posts.json
    await fs.writeFile(
      OUTPUT_FILE,
      JSON.stringify(sortedPosts, null, 2)
    );

    console.log(`✓ Successfully processed ${posts.length} posts`);
    return sortedPosts;
  } catch (error) {
    console.error('Error processing markdown files:', error);
    process.exit(1);
  }
}

processMarkdownFiles(); 