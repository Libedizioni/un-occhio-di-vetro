#!/bin/bash

# measure script timing
time_start() {
  START=$(date +%s%3N)
}
time_end() {
  END=$(( $(date +%s%3N) - $START ))
}

# conform editing shortcuts to markdown syntax
process_markdown_edits() {
  echo "[+] fixing all docx editing shortcuts in markdown files:"

  # search for .md files
  MD_FILES=$( find "$SRC" -type f -name '*.md' -print | sort )

  for SELECTED in $MD_FILES
    # and convert each to markdown
    do
      echo "[+] now processing " "$SELECTED"
      # process heading attributes
      sed -i 's/\\#/#/g' "$SELECTED"
      # fix missing image alt-text
      # @FIXME fix auto generate with pandoc & libreoffice and make alt-text meaningful by using docx image attributes
      sed -i 's/!\[\]/!\[image\]/g' "$SELECTED"
      # -------------------------- #
      #     Document Structure     #
      # -------------------------- #
      # process newlines
      sed -i 's/{NEWLINE}/<br\/>/g' "$SELECTED"
      # process page breaks
      sed -i 's/{NEWPAGE}/\\newpage\n<div class="breakpage"><\/div>/g' "$SELECTED"
      # process blockquote tag first, as it
      # differs from other tags
      sed -i 's/{QUOTE}/>/g' "$SELECTED"
      # search and escape list items inside dialogue sections
      sed -i '/{+DIALOGUE+}/,/{-DIALOGUE-}/s/-/\\\-/g' "$SELECTED"
      # search and remove DIALOGUE docx tag
      sed -i 's/{+DIALOGUE+}//g; s/{\\-DIALOGUE\\-}//g' "$SELECTED"
      # search and replace vertically centered divs
      sed -i -e '/{+MIDDLE/{;/+}/s/$/\n<div class="middle">/; s/MIDDLE/table/;}' "$SELECTED"
      sed -i 's/{-MIDDLE-}/<\/div>\n<\/div>/g;' "$SELECTED"
      # search and replace css classes between {: :} delimiters
      sed -i '/{:/,/:}/s/LEFT/alignleft/g; s/CENTER/aligncenter/g; s/RIGHT/alignright/g; s/CITE/citation/g; s/SMALLER/smaller/g; s/SMALL/small/g; s/BIG/big/g; s/BIGGER/bigger/g; s/+TAB/linepush/g; s/-TAB/linepull/g' "$SELECTED"
      # search and replace css classes between {+ +} delimiters
      sed -i '/{+/,/+}/s/LEFT/alignleft/g; s/CENTER/aligncenter/g; s/RIGHT/alignright/g; s/CITE/citation/g; s/SMALLER/smaller/g; s/SMALL/small/g; s/BIG/big/g; s/BIGGER/bigger/g; s/COMPACT/compact/g; s/BLOCK/no-break/g; s/MONO/monospace/g; s/CONDENSED/condensed/g; s/COLUMNS/col/g; s/2COL/col-2/g; s/3COL/col-3/g; s/4COL/col-4/g; s/LAST/col-last/g' "$SELECTED"
      # search for opening and closing {: :} and append
      # a closing html paragraph tag to end of line
      sed -i -e '/{:/{;/:}/s/$/<\/p>/;}' "$SELECTED"
      # process blockquote tag last, as they
      # differ from other tags
      sed -i 's/{QUOTE}/>/g' "$SELECTED"
      # search for opening and closing {: :} and replace
      # with proper html paragraph opening tag
      sed -i -e 's/{:/<p class="/g; s/:}/">/g' "$SELECTED"
      # search for opening and closing {+ +} and replace
      # with proper html div opening tag
      sed -i -e 's/{+/<div class="/g; s/+}/">/g' "$SELECTED"
      # search for opening and closing {- -} and replace
      # with proper html div closing tag
      sed -i -e 's/{-\(.*\)-}/<\/div>/g' "$SELECTED"

    done

}

# report script info and execution time
report() {
  sec_diff=$(($END / 1000))
  ms_hrs=$(printf "%02d" $(($sec_diff / 3600)))
  ms_min=$(printf "%02d" $((($sec_diff / 60) % 60)))
  ms_sec=$(printf "%02d" $(($sec_diff % 60)))
  ms_msec=$(printf "%03d" $(($END % 1000)))
  TOT_TIME="$ms_hrs:$ms_min:$ms_sec:$ms_msec"

  echo "Script $( basename $0 ) execution time: " "$TOT_TIME"
}

# get it done!
time_start
process_markdown_edits
time_end
report
