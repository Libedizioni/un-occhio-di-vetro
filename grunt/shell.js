/**
 * Run shell commands.
 *
 * @link https://github.com/sindresorhus/grunt-shell
 */
module.exports = {

	// ---------------------------------- //
	//           NEW BOOK BUILD           //
	// ---------------------------------- //
	prepare_markdown: {
		command: [
			// Setup Variables to pass to prepare-markdown.sh
			'DOCX=<%= book.path.docx %>',
			'SRC=<%= book.path.src %>',
			// Source and run prepare-markdown.sh
			'. ./inc/scripts/prepare-markdown.sh'
		].join(' && ')
	},
	process_markdown_edits: {
		command: [
			// Setup Variables to pass to process-markdown-edits.sh
			'SRC=<%= book.path.src %>',
			// Source and run process-markdown-edits.sh
			'. ./inc/scripts/process-markdown-edits.sh',
			'cat $( find "<%= book.path.intro %>" -type f -name "*.md" -printf "%p " ) >> "<%= pkg.dir.inc %>/title.yaml"'
		].join(' && ')
	},
	/*jshint multistr:true */
	build_epub: {
		command: [
			// Setup Variables to pass to build-epub.sh
			'BOOKNAME=<%= book.name %>',
			'BUILD=<%= book.path.build %>',
			'TOC_DEPTH=<%= book.tocdepth %>',
			'INTRO=$( find "<%= book.path.intro %>" -type f -name "*.md" -printf "%p " )',
			'SOURCE=$( find "<%= book.path.src %>" -maxdepth 1 -type f -name "*.md" -printf "%p " )',
			'COVER_IMAGE=<%= book.cover %>',
			'IMAGES=<%= book.images %>',
			'FONTS=<%= book.fonts %>/*.ttf',
			'CSS=<%= book.css %>',
			'METADATA=<%= book.metadata %>',
			'TITLE=<%= book.booktitle %>',
			'TEMPLATE_EPUB=<%= book.templates.epub %>',
			'ISBN_EPUB=<%= book.publisher.isbn.epub %>',
			// Set proper ISBN for epub file format
			'if [ ! -z "$ISBN_EPUB" ]; then sed -i "s|BOOK_ISBN|ISBN <%= book.publisher.isbn.epub %>|g" "<%= pkg.dir.inc %>/title.yaml"; fi',
			'if [ ! -z "$ISBN_EPUB" ]; then sed -i "s|BOOK_ISBN|<%= book.publisher.isbn.epub %>|g" "<%= pkg.dir.inc %>/metadata.xml"; fi',
			// Source and run build-epub.sh
			'. ./inc/scripts/build-epub.sh',
			// Reset BOOK_ISBN tag to initial state
			'if [ ! -z "$ISBN_EPUB" ]; then echo "Reset BOOK_ISBN tag to initial state for EPUB"; fi',
			'if [ ! -z "$ISBN_EPUB" ]; then sed -i "s|ISBN <%= book.publisher.isbn.epub %>|BOOK_ISBN|g" "<%= pkg.dir.inc %>/title.yaml"; fi',
			'if [ ! -z "$ISBN_EPUB" ]; then sed -i "s|<%= book.publisher.isbn.epub %>|BOOK_ISBN|g" "<%= pkg.dir.inc %>/metadata.xml"; fi'
		].join(' && ')
	},
	build_html: {
		command: [
			// Setup Variables to pass to build-html.sh
			'BOOKNAME=<%= book.name %>',
			'BUILD=<%= book.path.build %>',
			'TOC_DEPTH=<%= book.tocdepth %>',
			'TITLE=<%= book.booktitle %>',
			'SOURCE=$( find "<%= book.path.src %>" -maxdepth 1 -type f -name "*.md" -printf "%p " )',
			'CSS=<%= book.css %>',
			// Source and run build-html.sh
			'. ./inc/scripts/build-html.sh'
		].join(' && ')
	},
	build_pdf: {
		command: [
			// Setup Variables to pass to build-pdf.sh
			'BOOKNAME=<%= book.name %>',
			'BUILD=<%= book.path.build %>',
			'TOC_DEPTH=<%= book.tocdepth %>',
			'TITLE=<%= book.booktitle %>',
			'INTRO=$( find "<%= book.path.intro %>" -maxdepth 1 -type f -name "*.md" -printf "%p " )',
			'SOURCE=$( find "<%= book.path.src %>" -type f -name "*.md" -printf "%p " )',
			'TEMPLATE_PDF=<%= book.templates.pdf %>',
			'ISBN_PDF=<%= book.publisher.isbn.pdf %>',
			'ISBN_EPUB=<%= book.publisher.isbn.epub %>',
			// Additional fields needed by Calibre ebook-convert
			'AUTHOR="<%= book.author.name %> <%= book.author.surname %>"',
			'PUBLISHER="<%= book.publisher.name %>"',
			'DESCRIPTION="<%= book.description %>"',
			'TAGS="<%= book.tags.one %>,<%= book.tags.two %>,<%= book.tags.three %>,<%= book.tags.four %>,<%= book.tags.five %>,<%= book.tags.six %>"',
			// Convert either with LaTex or Calibre
			'ENGINE=Calibre',
			// Set proper ISBN for pdf file format
			'if [ ! -z "$ISBN_PDF" ]; then sed -i "s|BOOK_ISBN|ISBN <%= book.publisher.isbn.pdf %>|g" "<%= pkg.dir.inc %>/title.yaml"; fi',
			'if [ ! -z "$ISBN_PDF" ]; then sed -i "s|BOOK_ISBN|<%= book.publisher.isbn.pdf %>|g" "<%= pkg.dir.inc %>/metadata.xml"; fi',
			// Source and run build-pdf.sh
			'. ./inc/scripts/build-pdf.sh',
			// Reset BOOK_ISBN tag to initial state
			'if [ ! -z "$ISBN_PDF" ]; then echo "Reset BOOK_ISBN tag to initial state for PDF"; fi',
			'if [ ! -z "$ISBN_PDF" ]; then sed -i "s|ISBN <%= book.publisher.isbn.pdf %>|BOOK_ISBN|g" "<%= pkg.dir.inc %>/title.yaml"; fi',
			'if [ ! -z "$ISBN_PDF" ]; then sed -i "s|<%= book.publisher.isbn.pdf %>|BOOK_ISBN|g" "<%= pkg.dir.inc %>/metadata.xml"; fi'
		].join(' && ')
	},
	test_dependencies: {
		command: './inc/scripts/test-dependencies.sh'
	},


	// --------------------------------- //
	//         SCAFFOLD NEW BOOK         //
	// --------------------------------- //
	mkdir_scaffold_ebook: {
		command: 'mkdir -p ../<%= book.name %>'
	},
	/*jshint multistr:true */
	search_replace_intro: {
		command: [
			'cd ../<%= book.name %>',
			'for file in <%= book.path.intro %>/*.txt ; do cp -f "$file" "${file%.txt}.md" ; done',
			'sed -i "s|PUBLISHER|<%= book.publisher.name %>|g; \
					 s|LINK|<%= book.publisher.link %>|g; \
					 s|URL|<%= book.publisher.url %>|g; \
					 s|LOGO|<%= book.publisher.logo %>|g; \
					 s|ORIGINAL_TITLE|<%= book.original.title %>|g; \
					 s|ORIGINAL_EDITION|<%= book.original.publisher %>|g; \
					 s|ORIGINAL_YEAR|<%= book.original.year %>|g; \
					 s|TRANSLATOR|<%= book.translator.name %>|g; \
					 s|COVER_BY|<%= book.editor.cover.name %>|g; \
					 s|DESIGN|<%= book.editor.design %>|g; \
					 s|LAYOUT|<%= book.editor.layout %>|g; \
					 s|DATE|$(date +\"%Y\")|g; \
					 s|COPYRIGHT|<%= book.publisher.copyright %>|g" "<%= book.path.intro %>/"*.md'
		].join(' && ')
	},
	/*jshint multistr:false */
	search_replace_metadata: {
		command: [
			'cd ../<%= book.name %>',
			'sed -i "s|BOOK_TITLE|<%= book.title %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|BOOK_AUTHOR|<%= book.author.name %> <%= book.author.surname %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|AUTHOR_BOOK|<%= book.author.surname %>, <%= book.author.name %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|TRANSLATOR|<%= book.translator.name %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|COVER_BY|<%= book.editor.cover.name %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|DESIGN|<%= book.editor.design %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|LAYOUT|<%= book.editor.layout %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|PUBLISHER|<%= book.publisher.name %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|LANGUAGE|<%= book.publisher.language %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|DATE|$(date +\"%Y\")|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|BOOK_DESCRIPTION|<%= book.description %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|COPYRIGHT|<%= book.publisher.copyright %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|LICENSE|<%= book.publisher.license %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|LEGALCODE|<%= book.publisher.legalcode %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|TAG_1|<%= book.tags.one %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|TAG_2|<%= book.tags.two %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|TAG_3|<%= book.tags.three %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|TAG_4|<%= book.tags.four %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|TAG_5|<%= book.tags.five %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|TAG_6|<%= book.tags.six %>|g" "<%= pkg.dir.inc %>/metadata.xml"'
		].join(' && ')
	},
	search_replace_booktitle: {
		command: [
			'cd ../<%= book.name %>',
			'rm -f "<%= pkg.dir.inc %>/title.yaml"',
			'echo "---" >> "<%= pkg.dir.inc %>/title.yaml"',
			'echo "title: BOOK_TITLE" >> "<%= pkg.dir.inc %>/title.yaml"',
			'echo "author: BOOK_AUTHOR" >> "<%= pkg.dir.inc %>/title.yaml"',
			'echo "toc-title: TOC_TITLE" >> "<%= pkg.dir.inc %>/title.yaml"',
			'echo "---" >> "<%= pkg.dir.inc %>/title.yaml"',
			'echo "" >> "<%= pkg.dir.inc %>/title.yaml"',
			'sed -i "s|BOOK_TITLE|<%= book.title %>|g" "<%= pkg.dir.inc %>/title.yaml"',
			'sed -i "s|BOOK_AUTHOR|<%= book.author.name %> <%= book.author.surname %>|g" "<%= pkg.dir.inc %>/title.yaml"',
			'sed -i "s|TOC_TITLE|<%= book.toctitle %>|g" "<%= pkg.dir.inc %>/title.yaml"'
		].join(' && ')
	},
	search_replace_style: {
		command: [
			'cd ../<%= book.name %>',
			'sed -i "s|BOOK_TITLE|<%= book.title %>|g" "<%= pkg.dir.sass %>/style.scss"',
			'sed -i "s|BOOK_REPO|<%= book.repository.url %>|g" "<%= pkg.dir.sass %>/style.scss"',
			'sed -i "s|EDITOR_REPO|<%= book.publisher.repository %>|g" "<%= pkg.dir.sass %>/style.scss"',
			'sed -i "s|BOOK_DESCRIPTION|<%= book.description %>|g" "<%= pkg.dir.sass %>/style.scss"',
			'sed -i "s|CODE_LICENSE_URI|<%= book.repository.licenseuri %>|g" "<%= pkg.dir.sass %>/style.scss"',
			'sed -i "s|CODE_LICENSE|<%= book.repository.license %>|g" "<%= pkg.dir.sass %>/style.scss"',
			'sed -i "s|LICENSE|<%= book.publisher.license %>|g" "<%= pkg.dir.sass %>/style.scss"',
			'sed -i "s|LEGALCODE|<%= book.publisher.legalcode %>|g" "<%= pkg.dir.sass %>/style.scss"'
		].join(' && ')
	},
	search_replace_changelog_script: {
		command: [
			'cd ../<%= book.name %>',
			'sed -i "s|package.json|book-config.json|g" "<%= pkg.dir.scripts %>/changelog-version-tag.sh"',
			'sed -i "s|new_tag_header|new_book_tag_header|g" "<%= pkg.dir.scripts %>/changelog-version-tag.sh"',
			'sed -i "s|new_tag|new_book_tag|g" "<%= pkg.dir.scripts %>/changelog-version-tag.sh"'
		].join(' && ')
	},
	replace_readme: {
		command: [
			'cd ../<%= book.name %>',
			'rm README.md',
			'touch README.md',
			'echo "# <%= book.title %>" >> "README.md"',
			'echo "## <%= book.author.name %> <%= book.author.surname %>" >> "README.md"',
			'[ ! -z "<%= book.description %>" ] && echo "_<%= book.description %>_" >> "README.md"',
			'echo "" >> "README.md"',
			'echo "---" >> "README.md"',
			'echo "" >> "README.md"',
			'[ ! -z "<%= book.translator.name %>" ] && echo "- Translated by: **<%= book.translator.name %>**" >> "README.md"',
			'[ ! -z "<%= book.editor.design %>" ] && echo "- Ebook design: **<%= book.editor.design %>**" >> "README.md"',
			'[ ! -z "<%= book.editor.layout %>" ] && echo "- Ebook layout: **<%= book.editor.layout %>**" >> "README.md"',
			'echo "- Publisher: **<%= book.publisher.name %>**" >> "README.md"',
			'[ ! -z "<%= book.publisher.isbn.epub %>" ] || [ ! -z "<%= book.publisher.isbn.pdf %>" ] || [ ! -z "<%= book.publisher.isbn.mobi %>" ] && echo "- ISBN:" >> "README.md"',
			'[ ! -z "<%= book.publisher.isbn.epub %>" ] && echo "    - _epub_ - **<%= book.publisher.isbn.epub %>**" >> "README.md"',
			'[ ! -z "<%= book.publisher.isbn.pdf %>" ] && echo "    - _pdf_ - **<%= book.publisher.isbn.pdf %>**" >> "README.md"',
			'[ ! -z "<%= book.publisher.isbn.mobi %>" ] && echo "    - _mobi_ - **<%= book.publisher.isbn.mobi %>**" >> "README.md"',
			'echo "" >> "README.md"',
			'echo "**©** _$(date +\"%Y\")_ | <%= book.publisher.copyright %> | [<%= book.license %>](<%= book.publisher.legalcode %>)" >> "README.md"',
			'echo "" >> "README.md"',
			'[ ! -z "<%= book.original.title %>" ] && echo "Original title: _**<%= book.original.title %>**_ published by _**<%= book.original.publisher %>**_ in _<%= book.original.year %>_" >> "README.md"',
			'echo "" >> "README.md"',
			'echo "---" >> "README.md"',
			'echo "" >> "README.md"',
			'echo "###### _This ebook was generated with [Ebook Generator](<%= pkg.repository.url %>) - by [<%= pkg.author.name %>](<%= pkg.author.url %>) | [<%= book.publisher.name %>](<%= book.publisher.repository %>)._" >> "README.md"',
			'echo "" >> "README.md"'
		].join(' \ \n ')
	},
	init_book_git_repo: {
		command: [
			'cd ../<%= book.name %>',
			'grep -rl "ignore book-config used" .gitignore | xargs sed -i "/ignore book-config used/d"',
			'grep -rl "book-config.json" .gitignore | xargs sed -i "/book-config.json/d"',
			'rm CHANGELOG.md',
			'touch CHANGELOG.md',
			'echo "# <%= book.title %>" >> "CHANGELOG.md"',
			'echo "#### _changelog & history_" >> "CHANGELOG.md"',
			'echo "" >> "CHANGELOG.md"',
			'echo "" >> "CHANGELOG.md"',
			'echo "**v0.1.0**" >> "CHANGELOG.md"',
			'echo "" >> "CHANGELOG.md"',
			'echo "- init base book repository" >> "CHANGELOG.md"',
			'git init',
			'git config user.name "<%= book.repository.user.name %>"',
			'git config user.email "<%= book.repository.user.email %>"',
			'git remote add origin <%= book.repository.remote %>.<%= book.repository.type %>',
			'git add .',
			'git commit -m "Init repository: \"<%= book.name %>\""'
		].join(' && ')
	},

	// ----------------------------------------- //
	//       CHANGELOG AND VERSION UPDATES       //
	// ----------------------------------------- //
	changelog_version_tag: {
		command: [
			// Source and run build-pdf.sh
			'. ./inc/scripts/changelog-version-tag.sh'
		].join(' && ')
	}

};
