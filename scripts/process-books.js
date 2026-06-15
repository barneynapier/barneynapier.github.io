const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

const BOOKS_DIRECTORY = path.join(process.cwd(), 'src', 'books');
const OUTPUT_FILE = path.join(process.cwd(), 'src', 'books.json');

// Normalise a date that gray-matter may parse as a string or a Date object.
function toDateString(value) {
  if (!value) return 'No date';
  if (value instanceof Date) return value.toISOString().split('T')[0];
  return String(value).split('T')[0];
}

async function processBookNotes() {
  try {
    const files = await fs.readdir(BOOKS_DIRECTORY);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    const books = await Promise.all(
      markdownFiles.map(async (filename) => {
        const filePath = path.join(BOOKS_DIRECTORY, filename);
        const fileContent = await fs.readFile(filePath, 'utf8');
        const { data: metadata, content } = matter(fileContent);

        const slug = metadata.slug || filename.replace(/\.md$/, '');

        // Cover images live in public/book-covers; reference by basename so the
        // path is correct regardless of the export's original relative path.
        const coverFile = path.basename(metadata.cover_image || `${slug}.jpg`);

        let tags = metadata.tags || [];
        if (typeof tags === 'string') tags = [tags];
        if (!Array.isArray(tags)) tags = [];

        return {
          id: slug,
          title: metadata.title || 'Untitled',
          author: metadata.author || 'Unknown',
          rating: Number(metadata.rating) || 0,
          isFiction: Boolean(metadata.is_fiction),
          tags,
          date: toDateString(metadata.date),
          excerpt: metadata.excerpt || '',
          cover: `/book-covers/${coverFile}`,
          content: content.trim(),
        };
      })
    );

    // Newest read first, matching the writing list.
    const sortedBooks = books.sort((a, b) => new Date(b.date) - new Date(a.date));

    await fs.writeFile(OUTPUT_FILE, JSON.stringify(sortedBooks, null, 2));

    console.log(`✓ Successfully processed ${books.length} book notes`);
    return sortedBooks;
  } catch (error) {
    console.error('Error processing book notes:', error);
    process.exit(1);
  }
}

processBookNotes();
