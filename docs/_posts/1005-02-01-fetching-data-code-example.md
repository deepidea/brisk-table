---
layout: post
---
```
<div class="brisk-table tableConfig"
     data-json-path="$..teachers"
     data-custom-fields='[
         {"fieldName":"firstName","columnName":"First Name","columnWidth":10},
         {"fieldName":"lastName","columnName":"Last Name","columnWidth":60},
         {"fieldName":"age","columnName":"Age","columnWidth":10},
         {"fieldName":"cellPhone","columnName":"Cell Phone","columnWidth":330}
     ]'
     data-column-text-length="30"
 ```
 ```
     data-url="https://raw.githubusercontent.com/deepidea/brisk-table/master/json-server-db/db.json"
 ```
 ```
     data-hook-on-row-selected="hookFunction"
></div>
```